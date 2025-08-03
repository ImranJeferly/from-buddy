"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function BillingSection() {
  const { currentUser, userData } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [portalLoading, setPortalLoading] = useState(false);

  useEffect(() => {
    if (currentUser) {
      fetchTransactions();
    }
  }, [currentUser]);

  const fetchTransactions = async () => {
    try {
      const transactionsQuery = query(
        collection(db, 'transactions'),
        where('userId', '==', currentUser.uid),
        orderBy('createdAt', 'desc')
      );

      const snapshot = await getDocs(transactionsQuery);
      const transactionData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
        paidAt: doc.data().paidAt?.toDate(),
        failedAt: doc.data().failedAt?.toDate(),
      }));

      setTransactions(transactionData);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleManageBilling = async () => {
    setPortalLoading(true);
    
    try {
      const response = await fetch('/api/stripe/customer-portal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: currentUser.uid,
        }),
      });

      const { url } = await response.json();

      if (response.ok && url) {
        window.location.href = url;
      } else {
        throw new Error('Failed to create portal session');
      }
    } catch (error) {
      console.error('Error opening billing portal:', error);
      alert('Unable to open billing portal. Please try again.');
    } finally {
      setPortalLoading(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return 'N/A';
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatAmount = (amount, currency = 'usd') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(amount);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'succeeded':
        return 'text-green-600 bg-green-100';
      case 'failed':
        return 'text-red-600 bg-red-100';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900">Billing & Subscription</h3>
        {userData?.stripeCustomerId && (
          <button
            onClick={handleManageBilling}
            disabled={portalLoading}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {portalLoading ? 'Loading...' : 'Manage Billing'}
          </button>
        )}
      </div>

      {/* Current Plan */}
      <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
        <div className="flex justify-between items-center">
          <div>
            <h4 className="text-lg font-semibold text-blue-900 capitalize">
              {userData?.planType || 'Free'} Plan
            </h4>
            <p className="text-blue-700">
              Status: <span className="font-medium capitalize">{userData?.planStatus || 'Active'}</span>
            </p>
            {userData?.planType !== 'free' && userData?.planStartDate && (
              <p className="text-blue-600 text-sm mt-1">
                Started: {formatDate(userData.planStartDate.toDate())}
              </p>
            )}
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-900">
              {userData?.uploadQuota === Infinity ? '∞' : (userData?.uploadQuota || 3)}
            </div>
            <div className="text-sm text-blue-700">Upload Limit</div>
          </div>
        </div>
      </div>

      {/* Transaction History */}
      <div>
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Transaction History</h4>
        
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-2 text-gray-600">Loading transactions...</span>
          </div>
        ) : transactions.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p>No transactions found</p>
            <p className="text-sm mt-1">Your payment history will appear here</p>
          </div>
        ) : (
          <div className="space-y-3">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <h5 className="font-medium text-gray-900">{transaction.description}</h5>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                        {transaction.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {formatDate(transaction.createdAt)}
                      {transaction.paidAt && transaction.status === 'succeeded' && (
                        <span> • Paid on {formatDate(transaction.paidAt)}</span>
                      )}
                      {transaction.failedAt && transaction.status === 'failed' && (
                        <span> • Failed on {formatDate(transaction.failedAt)}</span>
                      )}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className={`text-lg font-semibold ${transaction.status === 'succeeded' ? 'text-green-600' : transaction.status === 'failed' ? 'text-red-600' : 'text-gray-900'}`}>
                      {formatAmount(transaction.amount, transaction.currency)}
                    </div>
                    {transaction.stripeInvoiceId && (
                      <p className="text-xs text-gray-500">ID: {transaction.stripeInvoiceId.slice(-8)}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {userData?.planType === 'free' && (
        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
          <h4 className="text-lg font-semibold text-gray-900 mb-2">Upgrade Your Plan</h4>
          <p className="text-gray-600 mb-3">Get more uploads and advanced features with a paid plan.</p>
          <a
            href="/#pricing"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            View Plans
          </a>
        </div>
      )}
    </div>
  );
}
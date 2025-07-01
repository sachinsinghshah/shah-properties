"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  FaCalculator,
  FaInfoCircle,
  FaChartLine,
  FaHome,
  FaRupeeSign,
} from "react-icons/fa";

export default function MortgageCalculatorPage() {
  // State variables for the calculator
  const [propertyValue, setPropertyValue] = useState<number>(5000000);
  const [downPaymentAmount, setDownPaymentAmount] = useState<number>(1000000);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [loanTerm, setLoanTerm] = useState<number>(20);
  const [interestRate, setInterestRate] = useState<number>(8.5);
  const [propertyTax, setPropertyTax] = useState<number>(25000);
  const [homeInsurance, setHomeInsurance] = useState<number>(12000);

  // Calculation results
  const [monthlyEMI, setMonthlyEMI] = useState<number>(0);
  const [principalInterest, setPrincipalInterest] = useState<number>(0);
  const [taxesInsurance, setTaxesInsurance] = useState<number>(0);
  const [loanAmount, setLoanAmount] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [totalCost, setTotalCost] = useState<number>(0);

  // Handle property value change
  const handlePropertyValueChange = (value: number) => {
    setPropertyValue(value);
    // Update down payment amount keeping percentage constant
    const newDownPaymentAmount = Math.round(value * (downPaymentPercent / 100));
    setDownPaymentAmount(newDownPaymentAmount);
  };

  // Handle down payment amount change
  const handleDownPaymentAmountChange = (value: number) => {
    setDownPaymentAmount(value);
    // Update down payment percentage
    if (propertyValue > 0) {
      const newPercentage = Math.round((value / propertyValue) * 100);
      setDownPaymentPercent(newPercentage);
    }
  };

  // Handle down payment percentage change
  const handleDownPaymentPercentChange = (value: number) => {
    setDownPaymentPercent(value);
    // Update down payment amount
    const newDownPaymentAmount = Math.round(propertyValue * (value / 100));
    setDownPaymentAmount(newDownPaymentAmount);
  };

  // Calculate EMI and other values whenever inputs change
  useEffect(() => {
    // Calculate loan amount
    const loan = propertyValue - downPaymentAmount;
    setLoanAmount(loan);

    // Calculate EMI (Principal + Interest)
    const monthlyInterestRate = interestRate / 12 / 100;
    const numberOfPayments = loanTerm * 12;

    if (monthlyInterestRate === 0) {
      setPrincipalInterest(loan / numberOfPayments);
    } else {
      const emi =
        (loan *
          monthlyInterestRate *
          Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
        (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
      setPrincipalInterest(emi);
    }

    // Calculate monthly taxes and insurance
    const monthlyTaxesInsurance = (propertyTax + homeInsurance) / 12;
    setTaxesInsurance(monthlyTaxesInsurance);

    // Calculate total monthly payment
    setMonthlyEMI(principalInterest + monthlyTaxesInsurance);

    // Calculate total interest paid over the life of the loan
    const totalPrincipalAndInterest = principalInterest * numberOfPayments;
    setTotalInterest(totalPrincipalAndInterest - loan);

    // Calculate total cost of home
    setTotalCost(
      propertyValue + totalInterest + (propertyTax + homeInsurance) * loanTerm
    );
  }, [
    propertyValue,
    downPaymentAmount,
    downPaymentPercent,
    loanTerm,
    interestRate,
    propertyTax,
    homeInsurance,
    principalInterest,
  ]);

  // Format number as Indian currency
  const formatIndianCurrency = (value: number): string => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        {/* Header */}
        <div className="bg-blue-900 text-white py-12 px-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">Home Loan Calculator</h1>
            <p className="text-xl text-blue-100">
              Plan your home purchase by estimating your monthly EMI payments
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto py-10 px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Calculator Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                  <FaCalculator className="text-blue-800 mr-3" />
                  Calculate Your Monthly EMI
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Property Value
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-3 text-gray-500">
                        ₹
                      </span>
                      <input
                        type="number"
                        value={propertyValue}
                        onChange={(e) =>
                          handlePropertyValueChange(Number(e.target.value))
                        }
                        className="w-full pl-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Down Payment
                    </label>
                    <div className="flex gap-4">
                      <div className="relative flex-1">
                        <span className="absolute left-3 top-3 text-gray-500">
                          ₹
                        </span>
                        <input
                          type="number"
                          value={downPaymentAmount}
                          onChange={(e) =>
                            handleDownPaymentAmountChange(
                              Number(e.target.value)
                            )
                          }
                          className="w-full pl-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="relative w-20">
                        <input
                          type="number"
                          value={downPaymentPercent}
                          onChange={(e) =>
                            handleDownPaymentPercentChange(
                              Number(e.target.value)
                            )
                          }
                          className="w-full pl-2 pr-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <span className="absolute right-3 top-3 text-gray-500">
                          %
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Loan Term
                    </label>
                    <select
                      value={loanTerm}
                      onChange={(e) => setLoanTerm(Number(e.target.value))}
                      className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="30">30 Years</option>
                      <option value="20">20 Years</option>
                      <option value="15">15 Years</option>
                      <option value="10">10 Years</option>
                      <option value="5">5 Years</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Interest Rate
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        step="0.01"
                        value={interestRate}
                        onChange={(e) =>
                          setInterestRate(Number(e.target.value))
                        }
                        className="w-full pr-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <span className="absolute right-3 top-3 text-gray-500">
                        %
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Property Tax (yearly)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-3 text-gray-500">
                        ₹
                      </span>
                      <input
                        type="number"
                        value={propertyTax}
                        onChange={(e) => setPropertyTax(Number(e.target.value))}
                        className="w-full pl-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Home Insurance (yearly)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-3 text-gray-500">
                        ₹
                      </span>
                      <input
                        type="number"
                        value={homeInsurance}
                        onChange={(e) =>
                          setHomeInsurance(Number(e.target.value))
                        }
                        className="w-full pl-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Results Section */}
              <div className="bg-white rounded-lg shadow-md p-6 mt-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                  <FaChartLine className="text-blue-800 mr-3" />
                  Payment Breakdown
                </h2>

                <div className="flex flex-col md:flex-row gap-6 justify-between mb-8">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <h3 className="text-gray-700 mb-1">Monthly EMI</h3>
                    <p className="text-3xl font-bold text-blue-900">
                      {formatIndianCurrency(monthlyEMI)}
                    </p>
                  </div>

                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <h3 className="text-gray-700 mb-1">Principal & Interest</h3>
                    <p className="text-3xl font-bold text-blue-900">
                      {formatIndianCurrency(principalInterest)}
                    </p>
                  </div>

                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <h3 className="text-gray-700 mb-1">Taxes & Insurance</h3>
                    <p className="text-3xl font-bold text-blue-900">
                      {formatIndianCurrency(taxesInsurance)}
                    </p>
                  </div>
                </div>

                {/* Additional details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Loan Details
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Loan Amount:</span>
                        <span className="font-medium">
                          {formatIndianCurrency(loanAmount)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Down Payment:</span>
                        <span className="font-medium">
                          {formatIndianCurrency(downPaymentAmount)} (
                          {downPaymentPercent}%)
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Loan Term:</span>
                        <span className="font-medium">{loanTerm} years</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Interest Rate:</span>
                        <span className="font-medium">{interestRate}%</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Cost Summary
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Property Value:</span>
                        <span className="font-medium">
                          {formatIndianCurrency(propertyValue)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Interest:</span>
                        <span className="font-medium">
                          {formatIndianCurrency(totalInterest)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">
                          Total Tax & Insurance:
                        </span>
                        <span className="font-medium">
                          {formatIndianCurrency(
                            (propertyTax + homeInsurance) * loanTerm
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between font-semibold">
                        <span>Total Cost:</span>
                        <span>{formatIndianCurrency(totalCost)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Loan Amortization Visualization */}
                <div className="mb-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Loan Amortization
                  </h3>
                  <div className="h-16 bg-gray-100 rounded-lg flex overflow-hidden">
                    {/* Principal */}
                    <div
                      className="bg-blue-700 h-full flex items-center justify-center text-white text-xs font-medium"
                      style={{ width: `${(loanAmount / totalCost) * 100}%` }}
                    >
                      Principal
                    </div>
                    {/* Interest */}
                    <div
                      className="bg-blue-500 h-full flex items-center justify-center text-white text-xs font-medium"
                      style={{ width: `${(totalInterest / totalCost) * 100}%` }}
                    >
                      Interest
                    </div>
                    {/* Taxes & Insurance */}
                    <div
                      className="bg-blue-300 h-full flex items-center justify-center text-blue-900 text-xs font-medium"
                      style={{
                        width: `${
                          (((propertyTax + homeInsurance) * loanTerm) /
                            totalCost) *
                          100
                        }%`,
                      }}
                    >
                      Tax & Ins.
                    </div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 mt-2">
                    <span>Year 1</span>
                    <span>Year {Math.ceil(loanTerm / 2)}</span>
                    <span>Year {loanTerm}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <FaInfoCircle className="text-blue-800 mr-2" />
                  How It Works
                </h3>

                <p className="text-gray-700 mb-4">
                  Our home loan calculator helps you estimate your monthly EMI
                  (Equated Monthly Installment), including principal, interest,
                  taxes, and insurance.
                </p>

                <h4 className="font-medium text-gray-900 mt-4 mb-2">
                  Key Terms:
                </h4>

                <ul className="space-y-2 text-gray-700">
                  <li>
                    <span className="font-medium">Principal:</span> The original
                    loan amount
                  </li>
                  <li>
                    <span className="font-medium">Interest:</span> What the bank
                    charges to borrow money
                  </li>
                  <li>
                    <span className="font-medium">EMI:</span> Equated Monthly
                    Installment - fixed payment amount made by a borrower to a
                    lender at a specified date each month
                  </li>
                  <li>
                    <span className="font-medium">Property Taxes:</span> Taxes
                    assessed by local government
                  </li>
                  <li>
                    <span className="font-medium">Insurance:</span> Homeowners
                    insurance premium
                  </li>
                </ul>
              </div>

              <div className="bg-blue-900 text-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <FaHome className="mr-2" />
                  Ready to Find Your Home?
                </h3>

                <p className="text-blue-100 mb-6">
                  Now that you have an idea of your budget, browse our listings
                  to find your dream home in Dehradun.
                </p>

                <a
                  href="/properties"
                  className="block w-full text-center bg-white text-blue-900 hover:bg-blue-50 py-3 rounded-md font-medium transition-colors"
                >
                  Browse Properties
                </a>
              </div>

              {/* EMI Formula */}
              <div className="bg-white rounded-lg shadow-md p-6 mt-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  EMI Formula
                </h3>
                <p className="text-gray-700 mb-4">
                  The monthly EMI is calculated using the following formula:
                </p>
                <div className="bg-gray-50 p-3 rounded-md text-center font-medium text-gray-800">
                  EMI = P × r × (1+r)ⁿ ÷ [(1+r)ⁿ-1]
                </div>
                <ul className="mt-4 space-y-2 text-sm text-gray-700">
                  <li>
                    <span className="font-medium">P:</span> Principal loan
                    amount
                  </li>
                  <li>
                    <span className="font-medium">r:</span> Monthly interest
                    rate (annual rate ÷ 12 ÷ 100)
                  </li>
                  <li>
                    <span className="font-medium">n:</span> Total number of
                    monthly installments (loan term in years × 12)
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

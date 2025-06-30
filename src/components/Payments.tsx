import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogTitle } from "@headlessui/react";
import { useToast } from "@/hooks/use-toast";
import { Banknote, DollarSign, ArrowRightLeft, CheckCircle2, XCircle, UserCircle2 } from "lucide-react";

type PaymentStatus = "completed" | "pending" | "failed";
type Payment = {
  id: number;
  investorName: string;
  startupIdea: string;
  amountPaid: number;
  dateOfPayment: string;
  paymentStatus: PaymentStatus;
  transferToFounder: boolean;
};

const initialPayments: Payment[] = [
  {
    id: 1,
    investorName: "John Smith",
    startupIdea: "TechFlow Solutions",
    amountPaid: 50000,
    dateOfPayment: "2024-01-15",
    paymentStatus: "completed",
    transferToFounder: false,
  },
  {
    id: 2,
    investorName: "Emily Davis",
    startupIdea: "AI Innovations",
    amountPaid: 75000,
    dateOfPayment: "2024-01-14",
    paymentStatus: "completed",
    transferToFounder: false,
  },
  {
    id: 3,
    investorName: "Michael Brown",
    startupIdea: "GreenTech Ventures",
    amountPaid: 100000,
    dateOfPayment: "2024-01-13",
    paymentStatus: "pending",
    transferToFounder: false,
  },
  {
    id: 4,
    investorName: "Sarah Johnson",
    startupIdea: "HealthTech Pro",
    amountPaid: 25000,
    dateOfPayment: "2024-01-12",
    paymentStatus: "completed",
    transferToFounder: true,
  },
];

const getStatusColor = (status: PaymentStatus) => {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-800";
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "failed":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const Payments = () => {
  const { toast } = useToast();
  const [payments, setPayments] = useState<Payment[]>(initialPayments);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);

  const handleTransferToggle = (id: number, checked: boolean) => {
    setPayments(payments.map(payment =>
      payment.id === id
        ? { ...payment, transferToFounder: checked }
        : payment
    ));
    if (checked) {
      toast({
        title: "Transfer Marked",
        description: "Payment marked as transferred to founder.",
      });
    }
  };

  const handleSendPayment = () => {
    if (selectedPayment) {
      setPayments(payments =>
        payments.map(p =>
          p.id === selectedPayment.id
            ? { ...p, transferToFounder: true }
            : p
        )
      );
      toast({
        title: "Payment Sent",
        description: `Payment of $${selectedPayment.amountPaid.toLocaleString()} sent to founder.`,
      });
      setModalOpen(false);
    }
  };

  const openPaymentModal = (payment: Payment) => {
    setSelectedPayment(payment);
    setModalOpen(true);
  };

  const closePaymentModal = () => {
    setSelectedPayment(null);
    setModalOpen(false);
  };

  const transferredCount = payments.filter(p => p.transferToFounder).length;
  const totalPending = payments.filter(p => !p.transferToFounder && p.paymentStatus === "completed").length;

  return (
    <div className="space-y-10 p-6 bg-gradient-to-br from-green-50 via-white to-blue-50 min-h-screen">
      <div className="flex items-center gap-3 mb-2">
        <Banknote className="w-10 h-10 text-green-500" />
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Payments Settlement</h1>
      </div>

      {/* Summary Badges */}
      <div className="flex gap-4">
        <Badge variant="secondary" className="text-lg px-3 py-1">
          {totalPending} Pending Transfer
        </Badge>
        <Badge className="bg-green-100 text-green-800 text-lg px-3 py-1">
          {transferredCount} Transferred
        </Badge>
      </div>

      {/* Payments Table */}
      <Card className="shadow-lg border-0 bg-white/90">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-700">
            <DollarSign className="w-5 h-5" />
            Payment Settlement Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Investor Name</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Startup Idea</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Amount Paid</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Date of Payment</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Payment Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Transfer to Founder</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                {payments.map(payment => (
                  <tr key={payment.id} className="border-b border-gray-100 hover:bg-green-50/40 transition">
                    <td className="py-3 px-4 font-medium">{payment.investorName}</td>
                    <td className="py-3 px-4">{payment.startupIdea}</td>
                    <td className="py-3 px-4 font-semibold">${payment.amountPaid.toLocaleString()}</td>
                    <td className="py-3 px-4 text-gray-500">{payment.dateOfPayment}</td>
                    <td className="py-3 px-4">
                      <Badge className={getStatusColor(payment.paymentStatus)}>
                        {payment.paymentStatus}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          checked={payment.transferToFounder}
                          onCheckedChange={() => {
                            if (!payment.transferToFounder && payment.paymentStatus === "completed") {
                              openPaymentModal(payment);
                            }
                          }}
                          disabled={payment.paymentStatus !== "completed" || payment.transferToFounder}
                        />
                        <span className={`text-sm ${
                          payment.transferToFounder
                            ? "text-green-600 font-medium"
                            : "text-gray-500"
                        }`}>
                          {payment.transferToFounder ? "Transferred" : "Pending"}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedPayment(payment)}
                        className="border-green-200"
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Bulk Actions (UI only, not functional) */}
      <div className="flex justify-between items-center bg-blue-50 p-4 rounded-lg">
        <div>
          <h3 className="font-semibold text-blue-900">Bulk Actions</h3>
          <p className="text-blue-700 text-sm">Mark multiple payments as transferred</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          Process Selected
        </Button>
      </div>

      {/* Payment Details Modal */}
      {/* Payment Details Modal */}
      <Dialog open={!!selectedPayment && !modalOpen} onClose={() => setSelectedPayment(null)}>
        <div className="flex items-center justify-center min-h-screen px-4">
          <div className="fixed inset-0 bg-black opacity-30" aria-hidden="true" />
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full z-10 p-6 relative">
            <DialogTitle className="text-lg font-bold mb-4">Payment Details</DialogTitle>
            {selectedPayment && (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <UserCircle2 className="w-8 h-8 text-green-400" />
                  <div>
                    <p className="font-semibold text-lg">{selectedPayment.investorName}</p>
                    <p className="text-xs text-neutral-500">{selectedPayment.startupIdea}</p>
                    <p className="text-xs text-neutral-400">ID: {selectedPayment.id}</p>
                  </div>
                </div>
                <div>
                  <span className="font-semibold">Amount Paid:</span>{" "}
                  <span className="font-semibold">${selectedPayment.amountPaid.toLocaleString()}</span>
                </div>
                <div>
                  <span className="font-semibold">Date of Payment:</span>{" "}
                  <span>{selectedPayment.dateOfPayment}</span>
                </div>
                <div>
                  <span className="font-semibold">Status:</span>{" "}
                  <Badge className={getStatusColor(selectedPayment.paymentStatus)}>
                    {selectedPayment.paymentStatus}
                  </Badge>
                </div>
                <div>
                  <span className="font-semibold">Transfer to Founder:</span>{" "}
                  {selectedPayment.transferToFounder ? (
                    <Badge className="bg-green-100 text-green-800">
                      <CheckCircle2 className="inline w-4 h-4 mr-1" />
                      Transferred
                    </Badge>
                  ) : (
                    <Badge className="bg-yellow-100 text-yellow-800">
                      <XCircle className="inline w-4 h-4 mr-1" />
                      Pending
                    </Badge>
                  )}
                </div>
                <Button className="w-full mt-4" variant="outline" onClick={() => setSelectedPayment(null)}>
                  Close
                </Button>
              </div>
            )}
          </div>
        </div>
      </Dialog>

      {/* Send Payment Modal */}
      <Dialog open={modalOpen} onClose={closePaymentModal} className="fixed z-50 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4">
          <div className="fixed inset-0 bg-black opacity-30" aria-hidden="true" />
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full z-10 p-6 relative">
            <DialogTitle className="text-lg font-bold mb-4">Send Payment to Founder</DialogTitle>
            {selectedPayment && (
              <div>
                <p className="mb-2">
                  <span className="font-semibold">Startup:</span> {selectedPayment.startupIdea}
                </p>
                <p className="mb-4">
                  <span className="font-semibold">Amount to Send:</span> ${selectedPayment.amountPaid.toLocaleString()}
                </p>
                {/* QR Code and Bank Details Section */}
                <div className="mb-4 flex flex-col items-center gap-2">
                  {/* Placeholder for QR Code */}
                  <div className="w-32 h-32 bg-gray-200 flex items-center justify-center rounded mb-2">
                    <span className="text-gray-500 text-sm">QR Code</span>
                  </div>
                  {/* Example Bank Details */}
                  <div className="text-sm text-gray-700 text-center">
                    <div><span className="font-semibold">Bank Name:</span> Example Bank</div>
                    <div><span className="font-semibold">Account No:</span> 1234567890</div>
                    <div><span className="font-semibold">IFSC:</span> EXAMPL0001</div>
                    <div><span className="font-semibold">Account Holder:</span> Founder Name</div>
                  </div>
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 mb-2" onClick={handleSendPayment}>
                  Send Payment
                </Button>
                <Button variant="outline" className="w-full" onClick={closePaymentModal}>
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default Payments;

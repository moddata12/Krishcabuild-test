import logo from "../assets/logo.svg"; // Ensure logo.svg is in the same directory
import React, { useState } from "react";
import "../assets/css/invoice.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const InvoiceTemplate = () => {
  const [invoice, setInvoice] = useState({
    companyName: "SGEN Energy and Infra Private Limited",
    addressLine1: "No.54 Ramachandra Nagar",
    addressLine2: "Iyyappanthangal, Chennai-56",
    billTo: "Client Name",
    clientAddress: "Client Address",
    shipTo: "Consignee Name",
    consigneeAddress: "Consignee Address",
    invoiceNumber: "001",
    deliveryNote: "DN001",
    buyersOrderNo: "PO12345",
    dispatchDocNo: "DD001",
    dispatchThrough: "Courier",
    invoiceDate: "2024-06-19",
    paymentTerms: "Net 30",
    otherReference: "REF123",
    deliveryNoteDate: "2024-06-15",
    destination: "Client Destination",
    termsOfDelivery: "Terms of Delivery",
    bankDetails:
      "Bank Name: ABC Bank\nAccount Number: 123456789\nIFSC Code: ABCD0123456",
    items: [
      {
        description: "Item 1",
        hsn: "1234",
        per: "kg",
        quantity: 2,
        unitPrice: 50,
      },
      {
        description: "Item 2",
        hsn: "5678",
        per: "kg",
        quantity: 1,
        unitPrice: 150,
      },
    ],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInvoice({ ...invoice, [name]: value });
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const newItems = [...invoice.items];
    newItems[index][name] = value;
    setInvoice({ ...invoice, items: newItems });
  };

  const addItem = () => {
    setInvoice({
      ...invoice,
      items: [
        ...invoice.items,
        { description: "", hsn: "", per: "", quantity: 0, unitPrice: 0 },
      ],
    });
  };

  const removeItem = (index) => {
    const newItems = invoice.items.filter((_, i) => i !== index);
    setInvoice({ ...invoice, items: newItems });
  };

  const calculateTotal = () => {
    const subtotal = invoice.items.reduce(
      (acc, item) => acc + item.quantity * item.unitPrice,
      0
    );
    const cgst = subtotal * 0.09;
    const sgst = subtotal * 0.09;
    const total = subtotal + cgst + sgst;
    return { subtotal, cgst, sgst, total };
  };

  const totals = calculateTotal();

  const numberToWords = (num) => {
    // Placeholder function to convert number to words
    // For demonstration, let's keep it simple
    const ones = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
    const teens = ["ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
    const tens = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];

    if (num === 0) {
      return "zero only";
    }

    let words = "";

    if (num >= 100) {
      words += ones[Math.floor(num / 100)] + " hundred ";
      num %= 100;
    }

    if (num >= 20) {
      words += tens[Math.floor(num / 10)] + " ";
      num %= 10;
    } else if (num >= 10) {
      words += teens[num - 10] + " ";
      num = 0;
    }

    if (num > 0) {
      words += ones[num];
    }

    return words.trim() + " only";
  };

  return (
    <div className="container">
      <div className="row mt-4">
        <div className="col-md-6">
          <img src={logo} alt="Company Logo" style={{ width: "150px" }} />
        </div>
        <div className="col-md-6 text-right">
          <input
            type="text"
            className="form-control-plaintext text-right font-weight-bold"
            name="companyName"
            value={invoice.companyName}
            onChange={handleChange}
          />
          <input
            type="text"
            className="form-control-plaintext text-right"
            name="addressLine1"
            value={invoice.addressLine1}
            onChange={handleChange}
          />
          <input
            type="text"
            className="form-control-plaintext text-right"
            name="addressLine2"
            value={invoice.addressLine2}
            onChange={handleChange}
          />
        </div>
      </div>
      <hr />
      <div className="row mt-4">
        <div className="col-md-12">
          <h4 className="text-center">Invoice</h4>
        </div>
      </div>
      <Container>
        <Row>
          <Col>
            <div className="col-md-6">
              <h6>Bill From:</h6>
              <input
                type="text"
                className="form-control"
                name="billFrom"
                value={invoice.billFrom}
                onChange={handleChange}
              />
              <input
                type="text"
                className="form-control"
                name="sellerAddress"
                value={invoice.sellerAddress}
                onChange={handleChange}
              />
              <h6>Buyer (Bill To):</h6>
              <input
                type="text"
                className="form-control"
                name="billTo"
                value={invoice.billTo}
                onChange={handleChange}
              />
              <input
                type="text"
                className="form-control"
                name="clientAddress"
                value={invoice.clientAddress}
                onChange={handleChange}
              />
              <h6 className="mt-3">Consignee (Ship To):</h6>
              <input
                type="text"
                className="form-control"
                name="shipTo"
                value={invoice.shipTo}
                onChange={handleChange}
              />
              <input
                type="text"
                className="form-control"
                name="consigneeAddress"
                value={invoice.consigneeAddress}
                onChange={handleChange}
              />
            </div>
          </Col>
          <Col>
            {" "}
            <h6>Invoice Details:</h6>
            <p>
              Invoice Number:{" "}
              <input
                type="text"
                className="form-control d-inline w-50"
                name="invoiceNumber"
                value={invoice.invoiceNumber}
                onChange={handleChange}
              />
            </p>
            <p>
              Delivery Note:{" "}
              <input
                type="text"
                className="form-control d-inline w-50"
                name="deliveryNote"
                value={invoice.deliveryNote}
                onChange={handleChange}
              />
            </p>
            <p>
              Buyer's Order No:{" "}
              <input
                type="text"
                className="form-control d-inline w-50"
                name="buyersOrderNo"
                value={invoice.buyersOrderNo}
                onChange={handleChange}
              />
            </p>
            <p>
              Dispatch Doc No:{" "}
              <input
                type="text"
                className="form-control d-inline w-50"
                name="dispatchDocNo"
                value={invoice.dispatchDocNo}
                onChange={handleChange}
              />
            </p>
            <p>
              Dispatch Through:{" "}
              <input
                type="text"
                className="form-control d-inline w-50"
                name="dispatchThrough"
                value={invoice.dispatchThrough}
                onChange={handleChange}
              />
            </p>
          </Col>
          <Col>
            {" "}
            <h6>Additional Details:</h6>
            <p>
              Date:{" "}
              <input
                type="text"
                className="form-control d-inline w-50"
                name="invoiceDate"
                value={invoice.invoiceDate}
                onChange={handleChange}
              />
            </p>
            <p>
              Mode/Terms of Payment:{" "}
              <input
                type="text"
                className="form-control d-inline w-50"
                name="paymentTerms"
                value={invoice.paymentTerms}
                onChange={handleChange}
              />
            </p>
            <p>
              Other Reference:{" "}
              <input
                type="text"
                className="form-control d-inline w-50"
                name="otherReference"
                value={invoice.otherReference}
                onChange={handleChange}
              />
            </p>
            <p>
              Delivery Note Date:{" "}
              <input
                type="text"
                className="form-control d-inline w-50"
                name="deliveryNoteDate"
                value={invoice.deliveryNoteDate}
                onChange={handleChange}
              />
            </p>
            <p>
              Destination:{" "}
              <input
                type="text"
                className="form-control d-inline w-50"
                name="destination"
                value={invoice.destination}
                onChange={handleChange}
              />
            </p>
            <h6>Terms of Delivery:</h6>
            <textarea
              className="form-control"
              name="termsOfDelivery"
              value={invoice.termsOfDelivery}
              onChange={handleChange}
            />
          </Col>
        </Row>
      </Container>
      <div className="row mt-4">
        <div className="col-md-12">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Sl.No</th>
                <th>Description</th>
                <th>HSN/SAC</th>
                <th>Per</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Total</th>
                <th>CGST @9%</th>
                <th>SGST @9%</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      name="description"
                      value={item.description}
                      onChange={(e) => handleItemChange(index, e)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      name="hsn"
                      value={item.hsn}
                      onChange={(e) => handleItemChange(index, e)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      name="per"
                      value={item.per}
                      onChange={(e) => handleItemChange(index, e)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      name="quantity"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(index, e)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      name="unitPrice"
                      value={item.unitPrice}
                      onChange={(e) => handleItemChange(index, e)}
                    />
                  </td>
                  <td>{item.quantity * item.unitPrice}</td>
                  <td>{(item.quantity * item.unitPrice * 0.09).toFixed(2)}</td>
                  <td>{(item.quantity * item.unitPrice * 0.09).toFixed(2)}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => removeItem(index)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan="10">
                  <button className="btn btn-primary" onClick={addItem}>
                    Add Item
                  </button>
                </td>
              </tr>
              <tr>
                <td colSpan="6" className="text-right">
                  <strong>Subtotal</strong>
                </td>
                <td>{totals.subtotal}</td>
                <td>{totals.cgst}</td>
                <td>{totals.sgst}</td>
                <td></td>
              </tr>
              <tr>
                <td colSpan="8" className="text-right">
                  <strong>Total</strong>
                </td>
                <td>{totals.total}</td>
                <td></td>
              </tr>
              <tr>
                <td colSpan="10" className="text-right">
                  <strong>Amount in words:</strong>{" "}
                  {numberToWords(totals.total)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-12">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>HSN/SAC</th>
                <th>Taxable Value</th>
                <th>Central Tax (Rate 9%, Amount)</th>
                <th>State Tax (Rate 9%, Amount)</th>
                <th>Total Tax Amount</th>
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((item, index) => (
                <tr key={index}>
                  <td>{item.hsn}</td>
                  <td>{item.quantity * item.unitPrice}</td>
                  <td>{(item.quantity * item.unitPrice * 0.09).toFixed(2)}</td>
                  <td>{(item.quantity * item.unitPrice * 0.09).toFixed(2)}</td>
                  <td>
                    {(item.quantity * item.unitPrice * 0.09 * 2).toFixed(2)}
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan="4" className="text-right">
                  <strong>Total</strong>
                </td>
                <td>{totals.cgst + totals.sgst}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <Container>
        <Row>
          <Col>
            <p>
              <strong>Declaration:</strong> We declare that this invoice shows
              the actual price of the goods described and that all particulars
              are true and correct.
            </p>
          </Col>
          <Col>
            <p>
              <strong>Company's Bank Details:</strong>
            </p>
            <pre>{invoice.bankDetails}</pre>
            <p>
              <strong>For {invoice.companyName}</strong>
            </p>
            <p>____________________</p>
            <p>(Authorized Signatory)</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default InvoiceTemplate;

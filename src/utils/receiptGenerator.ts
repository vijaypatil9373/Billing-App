import * as Print from "expo-print";
import * as Sharing from "expo-sharing";

export const generateReceiptPDF = async (
  invoice: any
) => {
  const html = `
    <!DOCTYPE html>
    <html>
      <body
        style="
          font-family: Arial;
          padding: 20px;
        "
      >
        <h1>
          Premium POS Store
        </h1>

        <p>
          Invoice No:
          ${invoice.invoiceNumber}
        </p>

        <p>
          Date:
          ${invoice.date}
        </p>

        <hr/>

        <h3>Items</h3>

        ${invoice.items
          .map(
            (item: any) => `
              <div
                style="
                  display:flex;
                  justify-content:space-between;
                  margin-bottom:8px;
                "
              >
                <span>
                  ${item.name}
                </span>

                <span>
                  ${item.quantity}
                  × ₹${item.price}
                </span>
              </div>
            `
          )
          .join("")}

        <hr/>

        <h3>
          Subtotal:
          ₹${invoice.subtotal}
        </h3>

        <h3>
          GST:
          ₹${invoice.gst}
        </h3>

        <h2>
          Total:
          ₹${invoice.total}
        </h2>

        <br/>

        <p>
          Thank You For Visiting ❤️
        </p>
      </body>
    </html>
  `;

  const { uri } =
    await Print.printToFileAsync({
      html,
    });

  await Sharing.shareAsync(uri);

  return uri;
};
import calculateTotalPriceAndBreakDown from "@utils/calculateTotalPriceAndBreakDown";

export default function checkoutHandler(req, res) {
  if (req.method === "POST") {
    const { items } = req.body;
    const priceDetails = calculateTotalPriceAndBreakDown(items);

    res.status(200).json(priceDetails);
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

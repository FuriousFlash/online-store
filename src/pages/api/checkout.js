import calculateTotalPrice from "@utils/calculateTotalPrice";

export default function checkoutHandler(req, res) {
  if (req.method === "POST") {
    const { items } = req.body;
    const totalPrice = calculateTotalPrice(items);

    res.status(200).json({ total: totalPrice });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

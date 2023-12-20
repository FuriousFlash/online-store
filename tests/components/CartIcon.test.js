import { render, screen, fireEvent } from "@testing-library/react";
import CartIcon from "@components/CartIcon";

describe("CartIcon", () => {
  it("displays the correct icon and item count", () => {
    const itemCount = 5;
    const handleClick = jest.fn();

    render(<CartIcon itemCount={itemCount} onClick={handleClick} />);

    expect(screen.getByTestId("HiShoppingCart")).toBeInTheDocument();

    const countElements = screen.getAllByText(itemCount.toString());
    expect(countElements.length).toBeGreaterThanOrEqual(1);

    fireEvent.click(screen.getByTestId("HiShoppingCart"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("displays the outline icon when cart is empty", () => {
    render(<CartIcon itemCount={0} onClick={() => {}} />);

    expect(screen.getByTestId("HiOutlineShoppingCart")).toBeInTheDocument();
  });
});

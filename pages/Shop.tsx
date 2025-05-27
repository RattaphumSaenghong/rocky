import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { PRODUCTS } from "../data/products";
import { useCart } from "../hooks/useCart";
import vipMap from "../assets/vip-map.png";

const SEAT_ROWS = ["A", "B", "C", "D"];
const SEAT_NUMBERS = Array.from({ length: 10 }, (_, i) => i + 1);
const VIP_SEAT_PRICE = 150;

export default function Shop() {
  const { cart, addToCart, updateQuantity, clearCart, total } = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const [vipSelected, setVipSelected] = useState<string[]>([]);
  const [bookedSeats, setBookedSeats] = useState<string[]>([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/booked")
      .then((res) => res.json())
      .then(setBookedSeats)
      .catch(console.error);
  }, []);

  const toggleVipSeat = (seat: string) => {
    if (bookedSeats.includes(seat)) return;
    setVipSelected((prev) =>
      prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]
    );
  };

  const addVipToCart = () => {
    if (vipSelected.length === 0) return;
    const vipItem = {
      id: 999,
      name: `VIP Seat(s): ${vipSelected.join(", ")}`,
      price: VIP_SEAT_PRICE * vipSelected.length,
      quantity: 1,
    };
    addToCart(vipItem);
  };

  const checkout = () => {
    if (vipSelected.length > 0) {
      fetch("http://localhost:4000/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ seats: vipSelected }),
      })
        .then((res) => res.json())
        .then(() => setBookedSeats((prev) => [...prev, ...vipSelected]))
        .catch(console.error);
    }

    alert(`Checkout complete! Total: $${total}`);
    clearCart();
    setVipSelected([]);
    setCartOpen(false);
  };

  return (
    <div className="bg-black text-red-200 min-h-screen">
      <div className="flex justify-between items-center px-6 py-4 border-b border-red-700 bg-black sticky top-0 z-50">
        <h1 className="text-2xl font-bold text-red-500">🎫 Rock Shop</h1>
        <Button className="bg-red-600 hover:bg-red-700" onClick={() => setCartOpen(true)}>
          🛒 Cart
        </Button>
      </div>

      <div className="flex">
        <main className="flex-1 p-6 space-y-10">
          <div>
            <h2 className="text-xl font-semibold text-red-400 mb-4">🪑 VIP Ticket Seating</h2>
            <div className="flex gap-6 items-start">
              <img src={vipMap} alt="VIP Seating Map" className="h-60 object-contain rounded-md border border-red-700" />
              <div className="space-y-4">
                {SEAT_ROWS.map((row) => (
                  <div key={row} className="flex items-center gap-2">
                    <span className="w-6 text-sm font-bold text-red-500">{row}</span>
                    <div className="grid grid-cols-5 gap-2">
                      {SEAT_NUMBERS.map((num) => {
                        const seat = `${row}${num}`;
                        const selected = vipSelected.includes(seat);
                        const booked = bookedSeats.includes(seat);
                        return (
                          <button
                            key={seat}
                            onClick={() => toggleVipSeat(seat)}
                            disabled={booked}
                            className={`px-2 py-1 rounded text-sm font-medium border transition-all ${
                              booked
                                ? "bg-red-900 text-gray-500 border-red-800 cursor-not-allowed"
                                : selected
                                ? "bg-red-600 border-red-700 text-white"
                                : "bg-gray-800 border-red-800 text-red-300 hover:bg-red-900"
                            }`}
                          >
                            {seat}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}

                {vipSelected.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <div className="text-sm">Selected Seats: {vipSelected.join(", ")}</div>
                    <div className="text-sm">Price per Seat: ${VIP_SEAT_PRICE}</div>
                    <div className="text-sm font-semibold">Total: ${VIP_SEAT_PRICE * vipSelected.length}</div>
                    <Button className="bg-red-600 hover:bg-red-700" onClick={addVipToCart}>
                      Add VIP Tickets to Cart
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-red-400 mb-2">🛍️ Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {PRODUCTS.map((product) => (
                <Card key={product.id}>
                  <CardContent className="p-4 space-y-2">
                    <div className="text-lg font-semibold">{product.name}</div>
                    <div className="text-sm text-red-300">${product.price}</div>
                    <Button className="bg-red-600 hover:bg-red-700" onClick={() => addToCart(product)}>
                      Add to cart
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>

        {/* Cart Sidebar */}
        <aside
          className={`fixed top-0 right-0 h-full w-80 bg-black border-l border-red-700 transform transition-transform z-50 p-6 overflow-y-auto ${
            cartOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-red-400">🛒 Cart</h2>
            <Button className="bg-red-600 hover:bg-red-700" onClick={() => setCartOpen(false)}>Close</Button>
          </div>

          {cart.length === 0 ? (
            <div className="text-red-500">Your cart is empty</div>
          ) : (
            <div className="space-y-4">
              {cart.map((item, i) => (
                <Card key={i}>
                  <CardContent className="p-4 flex justify-between items-center">
                    <div>
                      <div className="font-semibold">{item.name}</div>
                      <div className="text-sm text-red-300">
                        ${item.price} x {item.quantity}
                      </div>
                    </div>
                    <Input
                      type="number"
                      min="0"
                      value={item.quantity}
                      className="w-20"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        updateQuantity(item.id, parseInt(e.target.value))
                      }
                    />
                  </CardContent>
                </Card>
              ))}
              <div className="text-right text-lg font-semibold">Total: ${total}</div>
              <Button onClick={checkout} className="w-full bg-red-600 hover:bg-red-700">
                Checkout
              </Button>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}

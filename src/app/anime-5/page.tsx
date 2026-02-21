"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useRef, useState } from "react";

const ShoppingCartIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9M17 21a2 2 0 100-4 2 2 0 000 4zM9 21a2 2 0 100-4 2 2 0 000 4z"
    />
  </svg>
);

const PlusIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
    />
  </svg>
);

const StarIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

interface FloatingAnimation {
  id: string;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

interface AddToCartButtonProps {
  onAddToCart?: () => void;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
}

type ButtonState = "idle" | "loading" | "success";

const AddToCartButton = ({
  onAddToCart,
  disabled = false,
  className = "",
  children = "Add to Cart",
  variant = "default",
}: AddToCartButtonProps) => {
  const [buttonState, setButtonState] = useState<ButtonState>("idle");
  const [floatingAnimations, setFloatingAnimations] = useState<
    FloatingAnimation[]
  >([]);
  const buttonRef = useRef<HTMLDivElement>(null);

  const handleClick = useCallback(() => {
    if (disabled || buttonState !== "idle") return;

    setButtonState("loading");

    setTimeout(() => {
      setButtonState("success");
      onAddToCart?.();

      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        const cartElement = document.querySelector("[data-cart-icon]");
        const cartRect = cartElement?.getBoundingClientRect();

        if (cartRect) {
          const newAnimation: FloatingAnimation = {
            id: Date.now().toString(),
            startX: rect.left + rect.width / 2,
            startY: rect.top + rect.height / 2,
            endX: cartRect.left + cartRect.width / 2,
            endY: cartRect.top + cartRect.height / 2,
          };

          setFloatingAnimations((prev) => [...prev, newAnimation]);

          setTimeout(() => {
            setFloatingAnimations((prev) =>
              prev.filter((anim) => anim.id !== newAnimation.id),
            );
          }, 1000);
        }
      }

      setTimeout(() => {
        setButtonState("idle");
      }, 1500);
    }, 800);
  }, [disabled, buttonState, onAddToCart]);

  const getButtonStyle = () => {
    switch (buttonState) {
      case "loading":
        return { backgroundColor: "#6366f1", scale: 0.95 };
      case "success":
        return { backgroundColor: "#10b981", scale: 1.05 };
      default:
        return { scale: 1 };
    }
  };

  return (
    <>
      <motion.div
        ref={buttonRef}
        animate={getButtonStyle()}
        whileHover={buttonState === "idle" ? { scale: 1.02 } : {}}
        whileTap={buttonState === "idle" ? { scale: 0.98 } : {}}
        transition={{ duration: 0.2, ease: "easeOut" }}
        layoutId="add-to-cart-button"
      >
        <Button
          onClick={handleClick}
          disabled={disabled || buttonState !== "idle"}
          variant={variant}
          className={`relative overflow-hidden min-w-[140px] h-10 ${className}`}
          style={buttonState !== "idle" ? getButtonStyle() : {}}
        >
          <motion.span
            className="flex items-center justify-center"
            animate={{
              opacity: buttonState === "idle" ? 1 : 0,
              scale: buttonState === "idle" ? 1 : 0.8,
            }}
            transition={{ duration: 0.2 }}
          >
            {children}
          </motion.span>

          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{
              opacity: buttonState === "loading" ? 1 : 0,
              scale: buttonState === "loading" ? 1 : 0.8,
              rotate: buttonState === "loading" ? 360 : 0,
            }}
            transition={{
              opacity: { duration: 0.2 },
              scale: { duration: 0.2 },
              rotate: {
                duration: 0.8,
                repeat: buttonState === "loading" ? Infinity : 0,
                ease: "linear",
              },
            }}
          >
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
          </motion.div>

          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{
              opacity: buttonState === "success" ? 1 : 0,
              scale: buttonState === "success" ? 1 : 0.8,
            }}
            transition={{ duration: 0.2 }}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <motion.path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: buttonState === "success" ? 1 : 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </svg>
          </motion.div>

          <motion.div
            className="absolute inset-0 bg-white/20 rounded-md"
            initial={{ scale: 0, opacity: 0 }}
            animate={
              buttonState === "success"
                ? {
                    scale: [0, 1.2, 0],
                    opacity: [0, 0.3, 0],
                  }
                : { scale: 0, opacity: 0 }
            }
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </Button>
      </motion.div>

      <AnimatePresence>
        {floatingAnimations.map((animation) => (
          <motion.div
            key={animation.id}
            className="fixed pointer-events-none z-50"
            initial={{
              x: animation.startX,
              y: animation.startY,
              scale: 0,
              opacity: 0,
            }}
            animate={{
              x: animation.endX,
              y: animation.endY,
              scale: [0, 1.2, 0.8],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 0.8,
              ease: [0.25, 0.46, 0.45, 0.94],
              scale: { times: [0, 0.3, 1] },
            }}
          >
            <Badge className="bg-green-500 text-white shadow-lg">+1</Badge>
          </motion.div>
        ))}
      </AnimatePresence>
    </>
  );
};

const CartIcon = ({ count }: { count: number }) => {
  return (
    <motion.div
      className="relative p-3 bg-muted rounded-full hover:bg-muted/80 transition-colors cursor-pointer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      data-cart-icon
    >
      <ShoppingCartIcon className="w-6 h-6 text-muted-foreground" />

      <AnimatePresence>
        {count > 0 && (
          <motion.div
            className="absolute -top-2 -right-2"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 15 }}
            key={count}
          >
            <Badge
              variant="destructive"
              className="min-w-[20px] h-5 flex items-center justify-center px-1"
            >
              <motion.span
                initial={{ scale: 0.5 }}
                animate={{
                  scale: [0.5, 1.3, 1],
                }}
                transition={{
                  duration: 0.3,
                  times: [0, 0.6, 1],
                  ease: "easeOut",
                }}
              >
                {count}
              </motion.span>
            </Badge>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const ProductCard = ({
  product,
  onAddToCart,
}: {
  product: any;
  onAddToCart: () => void;
}) => {
  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
      <Card className="overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 bg-card border-border/50 backdrop-blur-sm">
        <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10">
          <motion.div
            className="absolute inset-0"
            animate={{
              background: [
                "linear-gradient(135deg, rgba(147, 197, 253, 0.1) 0%, rgba(196, 181, 253, 0.1) 100%)",
                "linear-gradient(135deg, rgba(196, 181, 253, 0.1) 0%, rgba(147, 197, 253, 0.1) 100%)",
              ],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl opacity-30">{product.emoji}</div>
          </div>
          <div className="absolute top-4 right-4">
            <Badge variant="secondary" className="flex items-center gap-1">
              <StarIcon className="w-3 h-3 text-yellow-500" />
              {product.rating}
            </Badge>
          </div>
        </div>

        <CardHeader className="pb-3">
          <CardTitle className="text-lg">{product.name}</CardTitle>
          <CardDescription className="text-sm">
            {product.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="pb-3">
          <div className="flex items-center justify-between mb-4">
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-foreground">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>
            {product.discount && (
              <Badge variant="destructive">-{product.discount}%</Badge>
            )}
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
            <span>🚚 Free shipping</span>
            <span>•</span>
            <span>⚡ Fast delivery</span>
          </div>
        </CardContent>

        <CardFooter>
          <AddToCartButton onAddToCart={onAddToCart} className="w-full">
            <PlusIcon className="w-4 h-4 mr-2" />
            Add to Cart
          </AddToCartButton>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default function EcommercePage() {
  const [cartCount, setCartCount] = useState(0);

  const products = [
    {
      id: 1,
      name: "AirPods Pro Max",
      description:
        "Premium wireless headphones with spatial audio and noise cancellation",
      price: 299,
      originalPrice: 399,
      discount: 25,
      rating: 4.8,
      emoji: "🎧",
    },
    {
      id: 2,
      name: "Apple Watch Ultra",
      description:
        "Advanced fitness tracking with titanium case and always-on display",
      price: 799,
      rating: 4.9,
      emoji: "⌚",
    },
    {
      id: 3,
      name: "HomePod Mini",
      description: "Smart speaker with 360-degree audio and Siri integration",
      price: 99,
      originalPrice: 129,
      discount: 23,
      rating: 4.6,
      emoji: "🔊",
    },
    {
      id: 4,
      name: "Magic Mouse",
      description:
        "Wireless mouse with Multi-Touch surface and rechargeable battery",
      price: 79,
      rating: 4.3,
      emoji: "🖱️",
    },
    {
      id: 5,
      name: 'iPad Pro 12.9"',
      description:
        "Liquid Retina XDR display with M2 chip and Apple Pencil support",
      price: 1099,
      originalPrice: 1299,
      discount: 15,
      rating: 4.9,
      emoji: "📱",
    },
    {
      id: 6,
      name: "MacBook Air M2",
      description: "Supercharged by M2 chip with 18-hour battery life",
      price: 1199,
      rating: 4.8,
      emoji: "💻",
    },
  ];

  const handleAddToCart = useCallback(() => {
    setCartCount((prev) => prev + 1);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground dark relative">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/20 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(120,119,198,0.08),transparent_50%)] pointer-events-none" />
      <div className="container mx-auto px-4 py-8 relative z-10">
        <motion.header
          className="flex items-center justify-between mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
              🛒 Premium Store
            </h1>
            <p className="text-muted-foreground text-lg">
              Experience smooth cart animations with{" "}
              <span className="text-primary font-medium">shadcn/ui</span> in
              dark mode
            </p>
          </div>

          <CartIcon count={cartCount} />
        </motion.header>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
              },
            },
          }}
        >
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <ProductCard product={product} onAddToCart={handleAddToCart} />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Card className="max-w-4xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Animation Features</CardTitle>
              <CardDescription>
                Built with Framer Motion and shadcn/ui components
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    title: "Morphing Button",
                    description: "Smooth state transitions with layoutId",
                    icon: "🔄",
                  },
                  {
                    title: "Loading Spinner",
                    description: "Elegant loading animation for 800ms",
                    icon: "⏳",
                  },
                  {
                    title: "Success Check",
                    description: "Animated checkmark with path drawing",
                    icon: "✅",
                  },
                  {
                    title: "Flying +1",
                    description: "Floating animation toward cart icon",
                    icon: "🚀",
                  },
                ].map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.0 + index * 0.1 }}
                  >
                    <Card className="text-center h-full">
                      <CardContent className="pt-6">
                        <div className="text-3xl mb-3">{feature.icon}</div>
                        <h3 className="font-semibold mb-2">{feature.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {feature.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.4 }}
        >
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Try the Animation</CardTitle>
              <CardDescription>
                Click any "Add to Cart" button to see the complete animation
                sequence: loading → success → floating +1 → cart badge update
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center">
                <AddToCartButton
                  onAddToCart={handleAddToCart}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  🛒 Try Animation
                </AddToCartButton>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

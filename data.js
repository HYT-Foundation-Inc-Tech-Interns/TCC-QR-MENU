/* ============================================================
   The Coffee Circle — Menu Data
   ------------------------------------------------------------
   Edit this single array to update the menu.
   Each product:
     id          unique string
     name        product name
     category    "coffee" | "non-coffee" | "food"
     description short description shown on the card
     longDesc    longer description shown in the detail modal
     price       number in PHP (no symbol)
     available   "in" | "low" | "out"
     sizes       optional array of { label, price }
     allergens   optional array of strings
     image       "type" and "colors" used by the SVG illustration generator
   ============================================================ */

const MENU_PRODUCTS = [
  /* ---------------- COFFEE ---------------- */
  {
    id: "c1",
    name: "Classic Espresso",
    category: "coffee",
    description: "A bold, concentrated shot of our house Arabica blend with a velvety crema.",
    longDesc: "Our signature espresso pulled from a medium-dark Arabica-Robusta blend. Notes of dark chocolate, toasted almond, and a hint of caramel. Served in a 2oz demitasse.",
    price: 95,
    available: "in",
    sizes: [{ label: "Single", price: 95 }, { label: "Double", price: 150 }],
    allergens: ["None"],
    image: { type: "espresso", colors: ["#3b2417", "#5a3a26", "#c87f3f"] }
  },
  {
    id: "c2",
    name: "Spanish Latte",
    category: "coffee",
    description: "Bold espresso meeting creamy milk with a touch of sweet condensed milk.",
    longDesc: "A café favorite — espresso layered with steamed milk and sweetened condensed milk for a silky, caramel-forward latte. Served iced or hot.",
    price: 165,
    available: "in",
    sizes: [{ label: "Hot 12oz", price: 165 }, { label: "Iced 16oz", price: 185 }],
    allergens: ["Milk"],
    image: { type: "latte", colors: ["#d9c7a8", "#8a6a52", "#3b2417"] }
  },
  {
    id: "c3",
    name: "Caramel Macchiato",
    category: "coffee",
    description: "Vanilla-marked steamed milk topped with espresso and a caramel drizzle.",
    longDesc: "Steamed milk marked with vanilla syrup, a double shot of espresso, and a signature caramel drizzle crosshatch. A sweet, layered classic.",
    price: 195,
    available: "in",
    sizes: [{ label: "Hot 12oz", price: 195 }, { label: "Iced 16oz", price: 215 }],
    allergens: ["Milk"],
    image: { type: "macchiato", colors: ["#e0a96d", "#c87f3f", "#3b2417"] }
  },
  {
    id: "c4",
    name: "Cold Brew",
    category: "coffee",
    description: "Slow-steeped 18 hours for a smooth, low-acidity coffee over ice.",
    longDesc: "Coarse-ground beans steeped in cold water for 18 hours, yielding a naturally sweet, low-acidity concentrate served over hand-cut ice. Smooth and chocolatey.",
    price: 175,
    available: "low",
    sizes: [{ label: "16oz", price: 175 }],
    allergens: ["None"],
    image: { type: "coldbrew", colors: ["#5a3a26", "#3b2417", "#d9c7a8"] }
  },
  {
    id: "c5",
    name: "Caffè Americano",
    category: "coffee",
    description: "Two shots of espresso lengthened with hot water for a clean, full-bodied cup.",
    longDesc: "A double espresso diluted with hot water to match the strength of drip coffee but with the richer, nuanced flavor of espresso. A purist's choice.",
    price: 130,
    available: "in",
    sizes: [{ label: "Hot 12oz", price: 130 }, { label: "Hot 16oz", price: 155 }],
    allergens: ["None"],
    image: { type: "americano", colors: ["#3b2417", "#5a3a26", "#e8d9c0"] }
  },
  {
    id: "c6",
    name: "Mocha Latte",
    category: "coffee",
    description: "Espresso, steamed milk, and rich Belgian chocolate, topped with whipped cream.",
    longDesc: "Our house latte enriched with Belgian dark chocolate sauce and finished with a cloud of whipped cream and a dusting of cocoa. Dessert in a cup.",
    price: 210,
    available: "out",
    sizes: [{ label: "Hot 12oz", price: 210 }, { label: "Iced 16oz", price: 230 }],
    allergens: ["Milk", "Soy"],
    image: { type: "mocha", colors: ["#8a6a52", "#3b2417", "#e8d9c0"] }
  },

  /* ---------------- NON-COFFEE ---------------- */
  {
    id: "n1",
    name: "Matcha Latte",
    category: "non-coffee",
    description: "Ceremonial-grade matcha whisked with steamed milk and a touch of honey.",
    longDesc: "Stone-ground ceremonial-grade Uji matcha whisked smooth, layered with steamed milk and a drizzle of local wildflower honey. Earthy, grassy, and lightly sweet.",
    price: 185,
    available: "in",
    sizes: [{ label: "Hot 12oz", price: 185 }, { label: "Iced 16oz", price: 205 }],
    allergens: ["Milk"],
    image: { type: "matcha", colors: ["#8aa86a", "#5a7a3a", "#d9c7a8"] }
  },
  {
    id: "n2",
    name: "Strawberry Lemonade",
    category: "non-coffee",
    description: "Fresh-squeezed lemonade blush with house-made strawberry purée.",
    longDesc: "Hand-pressed lemons, a strawberry purée cooked down from fresh berries, and a touch of cane sugar, served over ice with a mint sprig. Refreshingly tart.",
    price: 145,
    available: "in",
    sizes: [{ label: "16oz", price: 145 }],
    allergens: ["None"],
    image: { type: "lemonade", colors: ["#e07a6a", "#f7f1e8", "#c87f3f"] }
  },
  {
    id: "n3",
    name: "Dark Chocolate Malt",
    category: "non-coffee",
    description: "Creamy chocolate malted milkshake blended with vanilla ice cream.",
    longDesc: "A thick, velvety milkshake of dark chocolate, malted milk powder, and vanilla bean ice cream, blended smooth and topped with whipped cream and malt dust.",
    price: 195,
    available: "in",
    sizes: [{ label: "16oz", price: 195 }],
    allergens: ["Milk", "Soy"],
    image: { type: "malt", colors: ["#5a3a26", "#8a6a52", "#e8d9c0"] }
  },
  {
    id: "n4",
    name: "Honey Chamomile Tea",
    category: "non-coffee",
    description: "Caffeine-free chamomile blossoms steeped with wildflower honey.",
    longDesc: "Whole chamomile blossoms and a hint of lavender steeped in spring water, sweetened with wildflower honey. A calming, golden, floral cup — caffeine free.",
    price: 115,
    available: "in",
    sizes: [{ label: "Hot 12oz", price: 115 }, { label: "Iced 16oz", price: 135 }],
    allergens: ["None"],
    image: { type: "tea", colors: ["#e0a96d", "#c87f3f", "#f7f1e8"] }
  },
  {
    id: "n5",
    name: "Berry Hibiscus Cooler",
    category: "non-coffee",
    description: "Hibiscus tea over ice with mixed berries and a splash of soda.",
    longDesc: "Deep crimson hibiscus cold-brew, muddled mixed berries, fresh lime, and a splash of soda water. Tart, fruity, and effervescent — zero caffeine.",
    price: 155,
    available: "in",
    sizes: [{ label: "16oz", price: 155 }],
    allergens: ["None"],
    image: { type: "cooler", colors: ["#b04a6a", "#e07a6a", "#d9c7a8"] }
  },

  /* ---------------- FOOD ---------------- */
  {
    id: "f1",
    name: "Butter Croissant",
    category: "food",
    description: "Flaky, laminated all-butter croissant baked fresh each morning.",
    longDesc: "Twenty-seven layers of laminated European-style butter dough, baked to a deep golden flake. Crisp outside, airy and honeycombed within. Best warm.",
    price: 85,
    available: "in",
    allergens: ["Wheat", "Milk", "Eggs"],
    image: { type: "croissant", colors: ["#e0a96d", "#c87f3f", "#8a6a52"] }
  },
  {
    id: "f2",
    name: "Avocado Toast",
    category: "food",
    description: "Smashed avocado on sourdough with chili flakes, lime, and microgreens.",
    longDesc: "Ripe Hass avocado smashed with lime and sea salt on toasted house sourdough, finished with chili flakes, radish, and a tangle of microgreens. Vegetarian.",
    price: 245,
    available: "in",
    allergens: ["Wheat"],
    image: { type: "toast", colors: ["#8aa86a", "#e0a96d", "#5a3a26"] }
  },
  {
    id: "f3",
    name: "Classic Cheesecake",
    category: "food",
    description: "Dense, silky New York–style cheesecake on a graham crust.",
    longDesc: "A baked New York–style cheesecake — dense, creamy, and tangy — on a buttered graham cracker crust, finished with a thin glaze. Served chilled.",
    price: 175,
    available: "in",
    allergens: ["Milk", "Eggs", "Wheat"],
    image: { type: "cheesecake", colors: ["#f7f1e8", "#e8d9c0", "#c87f3f"] }
  },
  {
    id: "f4",
    name: "Ham & Cheese Panini",
    category: "food",
    description: "Pressed ciabatta with honey ham, gruyère, mustard, and arugula.",
    longDesc: "Toasted ciabatta pressed with thinly sliced honey-cured ham, melted Gruyère, whole-grain mustard, and fresh arugula. Served with a side of mixed greens.",
    price: 225,
    available: "low",
    allergens: ["Wheat", "Milk"],
    image: { type: "panini", colors: ["#c87f3f", "#e0a96d", "#8aa86a"] }
  },
  {
    id: "f5",
    name: "Chocolate Chip Cookie",
    category: "food",
    description: "Thick, chewy cookie with dark chocolate chunks and sea salt.",
    longDesc: "Brown butter cookie dough studded with 60% dark chocolate chunks, baked until just set at the center, finished with a pinch of flaky sea salt.",
    price: 65,
    available: "in",
    allergens: ["Wheat", "Milk", "Eggs", "Soy"],
    image: { type: "cookie", colors: ["#c87f3f", "#3b2417", "#e0a96d"] }
  },
  {
    id: "f6",
    name: "Tomato Basil Soup",
    category: "food",
    description: "Slow-simmered tomatoes, cream, and basil with a grilled cheese dippers.",
    longDesc: "Vine-ripened tomatoes simmered with garlic, basil, and a swirl of cream, blended silky smooth. Served with two grilled cheese dippers on sourdough.",
    price: 195,
    available: "out",
    allergens: ["Milk", "Wheat"],
    image: { type: "soup", colors: ["#b04a3a", "#e0a96d", "#8aa86a"] }
  }
];

// Category metadata for labels
const CATEGORIES = {
  "coffee": "Coffee",
  "non-coffee": "Non-Coffee Drinks",
  "food": "Food"
};

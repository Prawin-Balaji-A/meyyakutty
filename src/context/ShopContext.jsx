import React, { createContext, useContext, useState, useEffect } from 'react';

const ShopContext = createContext();

const initialPets = [
  // DOGS
  { id: 'd1', breed: 'Pug', category: 'Dogs', subcategory: 'Dogs', gender: 'Male', ageMonths: 2, isVaccinated: true, price: 15000, imageUrl: '/images/clean/dog_pug_.jpg', description: 'Cute and playful pug puppy.', inStock: true },
  { id: 'd2', breed: 'Labrador', category: 'Dogs', subcategory: 'Dogs', gender: 'Female', ageMonths: 2, isVaccinated: true, price: 18000, imageUrl: '/images/clean/dog_labrador.jpg', description: 'Friendly and energetic Labrador.', inStock: true },
  { id: 'd3', breed: 'Beagle', category: 'Dogs', subcategory: 'Dogs', gender: 'Male', ageMonths: 3, isVaccinated: true, price: 20000, imageUrl: '/images/clean/dog_beagle.jpg', description: 'Curious and loving Beagle puppy.', inStock: true },
  { id: 'd4', breed: 'German Shepherd', category: 'Dogs', subcategory: 'Dogs', gender: 'Male', ageMonths: 2, isVaccinated: true, price: 25000, imageUrl: '/images/clean/dog_german_shepherd.jpg', description: 'Strong and loyal German Shepherd.', inStock: true },
  { id: 'd5', breed: 'Golden Retriever', category: 'Dogs', subcategory: 'Dogs', gender: 'Female', ageMonths: 2, isVaccinated: true, price: 22000, imageUrl: '/images/clean/dog_golden_retriever.jpg', description: 'Gentle and affectionate Golden Retriever.', inStock: true },

  // CATS
  { id: 'c1', breed: 'Maine Coon', category: 'Cats', subcategory: 'Cats', gender: 'Male', ageMonths: 4, isVaccinated: true, price: 35000, imageUrl: '/images/clean/cat_maine_coon_cat.jpg', description: 'Majestic Maine Coon kitten.', inStock: true },
  { id: 'c2', breed: 'Bengal Cat', category: 'Cats', subcategory: 'Cats', gender: 'Female', ageMonths: 3, isVaccinated: true, price: 40000, imageUrl: '/images/clean/cat_bengal_cat.jpg', description: 'Exotic Bengal kitten.', inStock: true },
  { id: 'c3', breed: 'Persian Cat', category: 'Cats', subcategory: 'Cats', gender: 'Female', ageMonths: 2, isVaccinated: true, price: 18000, imageUrl: '/images/clean/cat_persian_cat.jpg', description: 'Fluffy white Persian kitten.', faceType: 'Doll Face', inStock: true },
  { id: 'c4', breed: 'Short Hair', category: 'Cats', subcategory: 'Cats', gender: 'Male', ageMonths: 2, isVaccinated: false, price: 8000, imageUrl: '/images/clean/cat_short_hair.jpg', description: 'Playful domestic short hair.', inStock: true },
  { id: 'c5', breed: 'Siamese Cat', category: 'Cats', subcategory: 'Cats', gender: 'Female', ageMonths: 3, isVaccinated: true, price: 25000, imageUrl: '/images/clean/cat_siamese_cat.jpg', description: 'Elegant Siamese kitten.', inStock: true },

  // FISH -> GUPPY
  { id: 'f1', breed: 'Albino Guppy', category: 'Fish', subcategory: 'Guppy', gender: 'Pair', ageMonths: 1, isVaccinated: false, price: 150, imageUrl: '/images/clean/guppy_fish_albino_guppy.jpg', description: 'Beautiful Albino Guppy pair.', inStock: true },
  { id: 'f2', breed: 'Black Guppy', category: 'Fish', subcategory: 'Guppy', gender: 'Pair', ageMonths: 1, isVaccinated: false, price: 120, imageUrl: '/images/clean/guppy_fish_black_guppy.jpg', description: 'Sleek Black Guppy pair.', inStock: true },
  { id: 'f3', breed: 'Blue Guppy', category: 'Fish', subcategory: 'Guppy', gender: 'Pair', ageMonths: 1, isVaccinated: false, price: 140, imageUrl: '/images/clean/guppy_fish_blue_guppy.jpg', description: 'Vibrant Blue Guppy pair.', inStock: true },
  { id: 'f4', breed: 'Fancy Guppy', category: 'Fish', subcategory: 'Guppy', gender: 'Pair', ageMonths: 1, isVaccinated: false, price: 200, imageUrl: '/images/clean/guppy_fish_fancy_guppy.jpg', description: 'Colorful Fancy Guppy pair.', inStock: true },
  { id: 'f5', breed: 'Red Tail Guppy', category: 'Fish', subcategory: 'Guppy', gender: 'Pair', ageMonths: 1, isVaccinated: false, price: 130, imageUrl: '/images/clean/guppy_fish_red_tail.jpg', description: 'Red Tail Guppy pair.', inStock: true },
  { id: 'f6', breed: 'Snake Guppy', category: 'Fish', subcategory: 'Guppy', gender: 'Pair', ageMonths: 1, isVaccinated: false, price: 180, imageUrl: '/images/clean/guppy_fish_snake_guppy_fish.jpg', description: 'Exotic Snake Guppy pair.', inStock: true },
  { id: 'f7', breed: 'Spotted Guppy', category: 'Fish', subcategory: 'Guppy', gender: 'Pair', ageMonths: 1, isVaccinated: false, price: 160, imageUrl: '/images/clean/guppy_fish_spotted_guppy.jpg', description: 'Spotted Guppy pair.', inStock: true },

  // FISH -> BETTA
  { id: 'fb1', breed: 'Half Moon Betta', category: 'Fish', subcategory: 'Betta', gender: 'Male', ageMonths: 2, isVaccinated: false, price: 350, imageUrl: '/images/clean/betta_fish_half_moon.jpg', description: 'Stunning Half Moon Betta.', inStock: true },
  { id: 'fb2', breed: 'Alien Betta', category: 'Fish', subcategory: 'Betta', gender: 'Male', ageMonths: 2, isVaccinated: false, price: 450, imageUrl: '/images/clean/betta_fish_ailen.jpg', description: 'Rare Alien Betta.', inStock: true },
  { id: 'fb3', breed: 'Full Moon Betta', category: 'Fish', subcategory: 'Betta', gender: 'Male', ageMonths: 2, isVaccinated: false, price: 400, imageUrl: '/images/clean/betta_fish_full_moon.jpg', description: 'Beautiful Full Moon Betta.', inStock: true },
  { id: 'fb4', breed: 'Samurai Betta', category: 'Fish', subcategory: 'Betta', gender: 'Male', ageMonths: 2, isVaccinated: false, price: 500, imageUrl: '/images/clean/betta_fish_samurai.jpg', description: 'Fierce Samurai Betta.', inStock: true },
  { id: 'fb5', breed: 'Wild Betta', category: 'Fish', subcategory: 'Betta', gender: 'Male', ageMonths: 2, isVaccinated: false, price: 300, imageUrl: '/images/clean/betta_fish_wild.jpg', description: 'Natural Wild Betta.', inStock: true },

  // FISH -> GOLDFISH
  { id: 'fg1', breed: 'Black Goldfish', category: 'Fish', subcategory: 'Goldfish', gender: 'Pair', ageMonths: 2, isVaccinated: false, price: 250, imageUrl: '/images/clean/gold_fish_black_gold.jpg', description: 'Jet black goldfish.', inStock: true },
  { id: 'fg2', breed: 'Bommer Head Goldfish', category: 'Fish', subcategory: 'Goldfish', gender: 'Pair', ageMonths: 3, isVaccinated: false, price: 600, imageUrl: '/images/clean/gold_fish_bommer_head.jpg', description: 'Premium Bommer Head.', inStock: true },
  { id: 'fg3', breed: 'Koi Goldfish', category: 'Fish', subcategory: 'Goldfish', gender: 'Pair', ageMonths: 2, isVaccinated: false, price: 400, imageUrl: '/images/clean/gold_fish_koi_gold.jpg', description: 'Koi patterned goldfish.', inStock: true },
  { id: 'fg4', breed: 'Normal Goldfish', category: 'Fish', subcategory: 'Goldfish', gender: 'Pair', ageMonths: 2, isVaccinated: false, price: 150, imageUrl: '/images/clean/gold_fish_normal.jpg', description: 'Classic goldfish.', inStock: true },
  { id: 'fg5', breed: 'Double Wing Goldfish', category: 'Fish', subcategory: 'Goldfish', gender: 'Pair', ageMonths: 2, isVaccinated: false, price: 300, imageUrl: '/images/clean/gold_fish_double_wing.jpg', description: 'Elegant double wing goldfish.', inStock: true },

  // FISH -> MOLLY & PLATY & ANGEL & OTHERS
  { id: 'fm1', breed: 'Black Molly', category: 'Fish', subcategory: 'Molly', gender: 'Pair', ageMonths: 1, isVaccinated: false, price: 80, imageUrl: '/images/clean/molly_fish_black_molly.jpg', description: 'Black Molly pair.', inStock: true },
  { id: 'fm2', breed: 'Ballon Molly', category: 'Fish', subcategory: 'Molly', gender: 'Pair', ageMonths: 1, isVaccinated: false, price: 120, imageUrl: '/images/clean/molly_fish_ballon_molly.jpg', description: 'Ballon Molly pair.', inStock: true },
  { id: 'fm3', breed: 'Chocolate Molly', category: 'Fish', subcategory: 'Molly', gender: 'Pair', ageMonths: 1, isVaccinated: false, price: 100, imageUrl: '/images/clean/molly_fish_chocolate_molly.jpg', description: 'Chocolate Molly pair.', inStock: true },
  { id: 'fm4', breed: 'Spotted Molly', category: 'Fish', subcategory: 'Molly', gender: 'Pair', ageMonths: 1, isVaccinated: false, price: 90, imageUrl: '/images/clean/molly_fish_spotted.jpg', description: 'Spotted Molly pair.', inStock: true },

  { id: 'fp1', breed: 'Red Platy', category: 'Fish', subcategory: 'Platy', gender: 'Pair', ageMonths: 1, isVaccinated: false, price: 100, imageUrl: '/images/clean/platy_fish_red_platy_fish.jpg', description: 'Red Platy pair.', inStock: true },
  { id: 'fp2', breed: 'Micky Mouse Platy', category: 'Fish', subcategory: 'Platy', gender: 'Pair', ageMonths: 1, isVaccinated: false, price: 150, imageUrl: '/images/clean/platy_fish_micky_mouse_platy_f.jpg', description: 'Micky Mouse Platy pair.', inStock: true },
  { id: 'fp3', breed: 'Blue Platy', category: 'Fish', subcategory: 'Platy', gender: 'Pair', ageMonths: 1, isVaccinated: false, price: 120, imageUrl: '/images/clean/platy_fish_blue_platy.jpg', description: 'Blue Platy pair.', inStock: true },

  { id: 'fa1', breed: 'Black Angel Fish', category: 'Fish', subcategory: 'Angel', gender: 'Pair', ageMonths: 2, isVaccinated: false, price: 200, imageUrl: '/images/clean/angel_fish_black.jpg', description: 'Black Angel fish.', inStock: true },
  { id: 'fa2', breed: 'Koi Angel Fish', category: 'Fish', subcategory: 'Angel', gender: 'Pair', ageMonths: 2, isVaccinated: false, price: 250, imageUrl: '/images/clean/angel_fish_koi_angel.jpg', description: 'Koi Angel fish.', inStock: true },
  { id: 'fa3', breed: 'Silver Angel Fish', category: 'Fish', subcategory: 'Angel', gender: 'Pair', ageMonths: 2, isVaccinated: false, price: 180, imageUrl: '/images/clean/angel_fish_silver_angel.jpg', description: 'Silver Angel fish.', inStock: true },
  
  { id: 'fs1', breed: 'Alligator Gar', category: 'Fish', subcategory: 'Monster Fish', gender: 'Single', ageMonths: 4, isVaccinated: false, price: 1500, imageUrl: '/images/clean/fish_alligator_gar_fish.jpg', description: 'Monster Alligator Gar.', inStock: true },
  { id: 'fs2', breed: 'Flower Horn', category: 'Fish', subcategory: 'Monster Fish', gender: 'Single', ageMonths: 5, isVaccinated: false, price: 3500, imageUrl: '/images/clean/fish_flower_horn_fish.jpg', description: 'Premium Flower Horn.', inStock: true },

  // BIRDS -> COCKTAIL, DOVE, LOVE BIRDS
  { id: 'b1', breed: 'Grey Cocktail', category: 'Birds', subcategory: 'Cocktail', gender: 'Pair', ageMonths: 6, isVaccinated: true, price: 3500, imageUrl: '/images/clean/cocktail_bird_grey.jpg', description: 'Grey Cocktail pair.', inStock: true },
  { id: 'b2', breed: 'Lutino Cocktail', category: 'Birds', subcategory: 'Cocktail', gender: 'Pair', ageMonths: 6, isVaccinated: true, price: 4000, imageUrl: '/images/clean/cocktail_bird_lutino.jpg', description: 'Lutino Cocktail pair.', inStock: true },
  { id: 'b3', breed: 'Albino Cocktail', category: 'Birds', subcategory: 'Cocktail', gender: 'Pair', ageMonths: 6, isVaccinated: true, price: 4500, imageUrl: '/images/clean/cocktail_bird_albino.jpg', description: 'Albino Cocktail pair.', inStock: true },
  
  { id: 'b4', breed: 'American Tail Dove', category: 'Birds', subcategory: 'Dove', gender: 'Pair', ageMonths: 8, isVaccinated: true, price: 2500, imageUrl: '/images/clean/dove_bird_american_tail.jpg', description: 'American Tail Dove pair.', inStock: true },
  { id: 'b5', breed: 'British Fantail Dove', category: 'Birds', subcategory: 'Dove', gender: 'Pair', ageMonths: 8, isVaccinated: true, price: 3500, imageUrl: '/images/clean/dove_bird_british_fantail.jpg', description: 'British Fantail Dove pair.', inStock: true },
  { id: 'b6', breed: 'Cover Head Dove', category: 'Birds', subcategory: 'Dove', gender: 'Pair', ageMonths: 8, isVaccinated: true, price: 2000, imageUrl: '/images/clean/dove_bird_cover_head.jpg', description: 'Cover Head Dove pair.', inStock: true },
  { id: 'b7', breed: 'King Dove', category: 'Birds', subcategory: 'Dove', gender: 'Pair', ageMonths: 8, isVaccinated: true, price: 3000, imageUrl: '/images/clean/dove_bird_king_dove.jpg', description: 'King Dove pair.', inStock: true },
  { id: 'b8', breed: 'Lahore Dove', category: 'Birds', subcategory: 'Dove', gender: 'Pair', ageMonths: 8, isVaccinated: true, price: 2800, imageUrl: '/images/clean/dove_bird_lahore.jpg', description: 'Lahore Dove pair.', inStock: true },
  { id: 'b9', breed: 'Owl Dove', category: 'Birds', subcategory: 'Dove', gender: 'Pair', ageMonths: 8, isVaccinated: true, price: 4000, imageUrl: '/images/clean/dove_bird_owl_dove.jpg', description: 'Owl Dove pair.', inStock: true },

  { id: 'b10', breed: 'Helicopter Love Bird', category: 'Birds', subcategory: 'Love Birds', gender: 'Pair', ageMonths: 4, isVaccinated: false, price: 1500, imageUrl: '/images/clean/love_bird_helicopter.jpg', description: 'Helicopter Love Bird pair.', inStock: true },
  { id: 'b11', breed: 'Budgie', category: 'Birds', subcategory: 'Love Birds', gender: 'Pair', ageMonths: 3, isVaccinated: false, price: 600, imageUrl: '/images/clean/love_birds_budgie.jpg', description: 'Budgie pair.', inStock: true },
  { id: 'b12', breed: 'Show Budgie', category: 'Birds', subcategory: 'Love Birds', gender: 'Pair', ageMonths: 4, isVaccinated: false, price: 1200, imageUrl: '/images/clean/love_birds_show_budgie.jpg', description: 'Premium Show Budgie pair.', inStock: true },

  // HAMSTERS
  { id: 'h1', breed: 'Hamster', category: 'Hamsters', subcategory: 'Hamsters', gender: 'Male', ageMonths: 2, isVaccinated: false, price: 800, imageUrl: '/images/clean/hamster.jpg', description: 'Active Hamster.', inStock: true },

  // OTHERS (Formerly Small Animals minus Hamster)
  { id: 's1', breed: 'Guinea Pig', category: 'Others', subcategory: 'Others', gender: 'Female', ageMonths: 3, isVaccinated: true, price: 1500, imageUrl: '/images/clean/guneia_pig.jpg', description: 'Cute Guinea Pig.', inStock: true },
  { id: 's3', breed: 'Rabbit', category: 'Others', subcategory: 'Others', gender: 'Male', ageMonths: 2, isVaccinated: true, price: 1200, imageUrl: '/images/clean/rabbit.jpg', description: 'Fluffy Rabbit.', inStock: true },

  // SUPPLIES
  { id: 'sup1', breed: 'Dog Food Bowl', category: 'Supplies', subcategory: 'Dog Supplies', gender: 'Accessory', ageMonths: 0, isVaccinated: false, price: 300, imageUrl: '/images/clean/dog_food_bowl.jpg', description: 'Durable Dog Food Bowl.', inStock: true, stockQuantity: 20 },
  { id: 'sup2', breed: 'Dog Comb', category: 'Supplies', subcategory: 'Dog Supplies', gender: 'Accessory', ageMonths: 0, isVaccinated: false, price: 250, imageUrl: '/images/clean/dog_comb.jpg', description: 'Steel Dog Comb.', inStock: true, stockQuantity: 15 },
  { id: 'sup3', breed: 'Dog Shampoo', category: 'Supplies', subcategory: 'Dog Supplies', gender: 'Accessory', ageMonths: 0, isVaccinated: false, price: 400, imageUrl: '/images/clean/dog_shampoo.jpg', description: 'Premium Dog Shampoo.', inStock: true, stockQuantity: 10 },
  { id: 'sup4', breed: 'Dog Travel Bag', category: 'Supplies', subcategory: 'Dog Supplies', gender: 'Accessory', ageMonths: 0, isVaccinated: false, price: 1200, imageUrl: '/images/clean/dog_travel_bag.jpg', description: 'Comfortable Travel Bag.', inStock: true, stockQuantity: 5 },

  { id: 'sup5', breed: 'Cat Feeder', category: 'Supplies', subcategory: 'Cat Supplies', gender: 'Accessory', ageMonths: 0, isVaccinated: false, price: 350, imageUrl: '/images/clean/cat_accessories_cat_feeder.jpg', description: 'Automatic Cat Feeder.', inStock: true, stockQuantity: 10 },
  { id: 'sup6', breed: 'Cat Brush', category: 'Supplies', subcategory: 'Cat Supplies', gender: 'Accessory', ageMonths: 0, isVaccinated: false, price: 200, imageUrl: '/images/clean/cat_accessories_cat_brush.jpg', description: 'Soft Cat Brush.', inStock: true, stockQuantity: 8 },
  { id: 'sup7', breed: 'Cat Shampoo', category: 'Supplies', subcategory: 'Cat Supplies', gender: 'Accessory', ageMonths: 0, isVaccinated: false, price: 300, imageUrl: '/images/clean/cat_accessories_cat_shampoo.jpg', description: 'Cat Shampoo.', inStock: true, stockQuantity: 25 },
  { id: 'sup8', breed: 'Me-O Cat Food', category: 'Supplies', subcategory: 'Cat Supplies', gender: 'Food', ageMonths: 0, isVaccinated: false, price: 450, imageUrl: '/images/clean/cat_food_me_o.jpg', description: 'Me-O Dry Cat Food.', inStock: true, stockQuantity: 30 },

  { id: 'sup9', breed: 'Fish Bowl', category: 'Supplies', subcategory: 'Fish Supplies', gender: 'Accessory', ageMonths: 0, isVaccinated: false, price: 500, imageUrl: '/images/clean/fish_accessories_fish_bowl.jpg', description: 'Glass Fish Bowl.', inStock: true, stockQuantity: 12 },
  { id: 'sup10', breed: 'Fish Net', category: 'Supplies', subcategory: 'Fish Supplies', gender: 'Accessory', ageMonths: 0, isVaccinated: false, price: 100, imageUrl: '/images/clean/fish_accessories_fish_net.jpg', description: 'Aquarium Fish Net.', inStock: true, stockQuantity: 50 },
  { id: 'sup11', breed: 'Tank Heater', category: 'Supplies', subcategory: 'Fish Supplies', gender: 'Accessory', ageMonths: 0, isVaccinated: false, price: 800, imageUrl: '/images/clean/fish_accessories_fisk_tank_heater.jpg', description: 'Aquarium Heater.', inStock: true, stockQuantity: 15 },
  { id: 'sup12', breed: 'Tank Sand', category: 'Supplies', subcategory: 'Fish Supplies', gender: 'Accessory', ageMonths: 0, isVaccinated: false, price: 250, imageUrl: '/images/clean/fish_tank_sand.jpg', description: 'Aquarium Sand.', inStock: true, stockQuantity: 40 }
];

export const ShopProvider = ({ children }) => {
  const [pets, setPets] = useState(() => {
    const saved = localStorage.getItem('meyyakutty_pets');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Ensure new data struct replaces old one if categories don't match
        // Quick migration logic for "Small Animals" -> "Others"
        return parsed.map(pet => {
          if (pet.category === 'Small Animals') {
            if (pet.breed === 'Hamster') {
              return { ...pet, category: 'Hamsters', subcategory: 'Hamsters' };
            }
            return { ...pet, category: 'Others', subcategory: 'Others' };
          }
          return pet;
        });
      } catch (e) {
        console.error("Failed to parse pets from local storage");
      }
    }
    return initialPets;
  });

  useEffect(() => {
    localStorage.setItem('meyyakutty_pets', JSON.stringify(pets));
  }, [pets]);

  const updatePetStock = (id, quantityPurchased, isSupply) => {
    setPets(prev => prev.map(pet => {
      if (pet.id === id) {
        if (isSupply) {
          const newQty = (pet.stockQuantity || 0) - quantityPurchased;
          return { ...pet, stockQuantity: newQty, inStock: newQty > 0 };
        } else {
          return { ...pet, inStock: false };
        }
      }
      return pet;
    }));
  };

  const restorePetStock = (id, quantityRestored, isSupply) => {
    setPets(prev => prev.map(pet => {
      if (pet.id === id) {
        if (isSupply) {
          const newQty = (pet.stockQuantity || 0) + quantityRestored;
          return { ...pet, stockQuantity: newQty, inStock: newQty > 0 };
        } else {
          return { ...pet, inStock: true };
        }
      }
      return pet;
    }));
  };

  return (
    <ShopContext.Provider value={{ pets, setPets, updatePetStock, restorePetStock }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => useContext(ShopContext);

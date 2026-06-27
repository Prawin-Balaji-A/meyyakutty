import React, { createContext, useContext, useState } from 'react';

const ShopContext = createContext();

const initialPets = [
  // DOGS
  { id: 'd1', breed: 'Pug', category: 'Dogs', subcategory: 'Dogs', gender: 'Male', ageMonths: 2, isVaccinated: true, price: 15000, imageUrl: '/images/clean/dog_pug_.jpg', description: 'Cute and playful pug puppy.' },
  { id: 'd2', breed: 'Labrador', category: 'Dogs', subcategory: 'Dogs', gender: 'Female', ageMonths: 2, isVaccinated: true, price: 18000, imageUrl: '/images/clean/dog_labrador.jpg', description: 'Friendly and energetic Labrador.' },
  { id: 'd3', breed: 'Beagle', category: 'Dogs', subcategory: 'Dogs', gender: 'Male', ageMonths: 3, isVaccinated: true, price: 20000, imageUrl: '/images/clean/dog_beagle.jpg', description: 'Curious and loving Beagle puppy.' },
  { id: 'd4', breed: 'German Shepherd', category: 'Dogs', subcategory: 'Dogs', gender: 'Male', ageMonths: 2, isVaccinated: true, price: 25000, imageUrl: '/images/clean/dog_german_shepherd.jpg', description: 'Strong and loyal German Shepherd.' },
  { id: 'd5', breed: 'Golden Retriever', category: 'Dogs', subcategory: 'Dogs', gender: 'Female', ageMonths: 2, isVaccinated: true, price: 22000, imageUrl: '/images/clean/dog_golden_retriever.jpg', description: 'Gentle and affectionate Golden Retriever.' },

  // CATS
  { id: 'c1', breed: 'Maine Coon', category: 'Cats', subcategory: 'Cats', gender: 'Male', ageMonths: 4, isVaccinated: true, price: 35000, imageUrl: '/images/clean/cat_maine_coon_cat.jpg', description: 'Majestic Maine Coon kitten.' },
  { id: 'c2', breed: 'Bengal Cat', category: 'Cats', subcategory: 'Cats', gender: 'Female', ageMonths: 3, isVaccinated: true, price: 40000, imageUrl: '/images/clean/cat_bengal_cat.jpg', description: 'Exotic Bengal kitten.' },
  { id: 'c3', breed: 'Persian Cat', category: 'Cats', subcategory: 'Cats', gender: 'Female', ageMonths: 2, isVaccinated: true, price: 18000, imageUrl: '/images/clean/cat_persian_cat.jpg', description: 'Fluffy white Persian kitten.', faceType: 'Doll Face' },
  { id: 'c4', breed: 'Short Hair', category: 'Cats', subcategory: 'Cats', gender: 'Male', ageMonths: 2, isVaccinated: false, price: 8000, imageUrl: '/images/clean/cat_short_hair.jpg', description: 'Playful domestic short hair.' },
  { id: 'c5', breed: 'Siamese Cat', category: 'Cats', subcategory: 'Cats', gender: 'Female', ageMonths: 3, isVaccinated: true, price: 25000, imageUrl: '/images/clean/cat_siamese_cat.jpg', description: 'Elegant Siamese kitten.' },

  // FISH -> GUPPY
  { id: 'f1', breed: 'Albino Guppy', category: 'Fish', subcategory: 'Guppy', gender: 'Pair', ageMonths: 1, isVaccinated: false, price: 150, imageUrl: '/images/clean/guppy_fish_albino_guppy.jpg', description: 'Beautiful Albino Guppy pair.' },
  { id: 'f2', breed: 'Black Guppy', category: 'Fish', subcategory: 'Guppy', gender: 'Pair', ageMonths: 1, isVaccinated: false, price: 120, imageUrl: '/images/clean/guppy_fish_black_guppy.jpg', description: 'Sleek Black Guppy pair.' },
  { id: 'f3', breed: 'Blue Guppy', category: 'Fish', subcategory: 'Guppy', gender: 'Pair', ageMonths: 1, isVaccinated: false, price: 140, imageUrl: '/images/clean/guppy_fish_blue_guppy.jpg', description: 'Vibrant Blue Guppy pair.' },
  { id: 'f4', breed: 'Fancy Guppy', category: 'Fish', subcategory: 'Guppy', gender: 'Pair', ageMonths: 1, isVaccinated: false, price: 200, imageUrl: '/images/clean/guppy_fish_fancy_guppy.jpg', description: 'Colorful Fancy Guppy pair.' },
  { id: 'f5', breed: 'Red Tail Guppy', category: 'Fish', subcategory: 'Guppy', gender: 'Pair', ageMonths: 1, isVaccinated: false, price: 130, imageUrl: '/images/clean/guppy_fish_red_tail.jpg', description: 'Red Tail Guppy pair.' },
  { id: 'f6', breed: 'Snake Guppy', category: 'Fish', subcategory: 'Guppy', gender: 'Pair', ageMonths: 1, isVaccinated: false, price: 180, imageUrl: '/images/clean/guppy_fish_snake_guppy_fish.jpg', description: 'Exotic Snake Guppy pair.' },
  { id: 'f7', breed: 'Spotted Guppy', category: 'Fish', subcategory: 'Guppy', gender: 'Pair', ageMonths: 1, isVaccinated: false, price: 160, imageUrl: '/images/clean/guppy_fish_spotted_guppy.jpg', description: 'Spotted Guppy pair.' },

  // FISH -> BETTA
  { id: 'fb1', breed: 'Half Moon Betta', category: 'Fish', subcategory: 'Betta', gender: 'Male', ageMonths: 2, isVaccinated: false, price: 350, imageUrl: '/images/clean/betta_fish_half_moon.jpg', description: 'Stunning Half Moon Betta.' },
  { id: 'fb2', breed: 'Alien Betta', category: 'Fish', subcategory: 'Betta', gender: 'Male', ageMonths: 2, isVaccinated: false, price: 450, imageUrl: '/images/clean/betta_fish_ailen.jpg', description: 'Rare Alien Betta.' },
  { id: 'fb3', breed: 'Full Moon Betta', category: 'Fish', subcategory: 'Betta', gender: 'Male', ageMonths: 2, isVaccinated: false, price: 400, imageUrl: '/images/clean/betta_fish_full_moon.jpg', description: 'Beautiful Full Moon Betta.' },
  { id: 'fb4', breed: 'Samurai Betta', category: 'Fish', subcategory: 'Betta', gender: 'Male', ageMonths: 2, isVaccinated: false, price: 500, imageUrl: '/images/clean/betta_fish_samurai.jpg', description: 'Fierce Samurai Betta.' },
  { id: 'fb5', breed: 'Wild Betta', category: 'Fish', subcategory: 'Betta', gender: 'Male', ageMonths: 2, isVaccinated: false, price: 300, imageUrl: '/images/clean/betta_fish_wild.jpg', description: 'Natural Wild Betta.' },

  // FISH -> GOLDFISH
  { id: 'fg1', breed: 'Black Goldfish', category: 'Fish', subcategory: 'Goldfish', gender: 'Pair', ageMonths: 2, isVaccinated: false, price: 250, imageUrl: '/images/clean/gold_fish_black_gold.jpg', description: 'Jet black goldfish.' },
  { id: 'fg2', breed: 'Bommer Head Goldfish', category: 'Fish', subcategory: 'Goldfish', gender: 'Pair', ageMonths: 3, isVaccinated: false, price: 600, imageUrl: '/images/clean/gold_fish_bommer_head.jpg', description: 'Premium Bommer Head.' },
  { id: 'fg3', breed: 'Koi Goldfish', category: 'Fish', subcategory: 'Goldfish', gender: 'Pair', ageMonths: 2, isVaccinated: false, price: 400, imageUrl: '/images/clean/gold_fish_koi_gold.jpg', description: 'Koi patterned goldfish.' },
  { id: 'fg4', breed: 'Normal Goldfish', category: 'Fish', subcategory: 'Goldfish', gender: 'Pair', ageMonths: 2, isVaccinated: false, price: 150, imageUrl: '/images/clean/gold_fish_normal.jpg', description: 'Classic goldfish.' },
  { id: 'fg5', breed: 'Double Wing Goldfish', category: 'Fish', subcategory: 'Goldfish', gender: 'Pair', ageMonths: 2, isVaccinated: false, price: 300, imageUrl: '/images/clean/gold_fish_double_wing.jpg', description: 'Elegant double wing goldfish.' },

  // FISH -> MOLLY & PLATY & ANGEL & OTHERS
  { id: 'fm1', breed: 'Black Molly', category: 'Fish', subcategory: 'Molly', gender: 'Pair', ageMonths: 1, isVaccinated: false, price: 80, imageUrl: '/images/clean/molly_fish_black_molly.jpg', description: 'Black Molly pair.' },
  { id: 'fm2', breed: 'Ballon Molly', category: 'Fish', subcategory: 'Molly', gender: 'Pair', ageMonths: 1, isVaccinated: false, price: 120, imageUrl: '/images/clean/molly_fish_ballon_molly.jpg', description: 'Ballon Molly pair.' },
  { id: 'fm3', breed: 'Chocolate Molly', category: 'Fish', subcategory: 'Molly', gender: 'Pair', ageMonths: 1, isVaccinated: false, price: 100, imageUrl: '/images/clean/molly_fish_chocolate_molly.jpg', description: 'Chocolate Molly pair.' },
  { id: 'fm4', breed: 'Spotted Molly', category: 'Fish', subcategory: 'Molly', gender: 'Pair', ageMonths: 1, isVaccinated: false, price: 90, imageUrl: '/images/clean/molly_fish_spotted.jpg', description: 'Spotted Molly pair.' },

  { id: 'fp1', breed: 'Red Platy', category: 'Fish', subcategory: 'Platy', gender: 'Pair', ageMonths: 1, isVaccinated: false, price: 100, imageUrl: '/images/clean/platy_fish_red_platy_fish.jpg', description: 'Red Platy pair.' },
  { id: 'fp2', breed: 'Micky Mouse Platy', category: 'Fish', subcategory: 'Platy', gender: 'Pair', ageMonths: 1, isVaccinated: false, price: 150, imageUrl: '/images/clean/platy_fish_micky_mouse_platy_f.jpg', description: 'Micky Mouse Platy pair.' },
  { id: 'fp3', breed: 'Blue Platy', category: 'Fish', subcategory: 'Platy', gender: 'Pair', ageMonths: 1, isVaccinated: false, price: 120, imageUrl: '/images/clean/platy_fish_blue_platy.jpg', description: 'Blue Platy pair.' },

  { id: 'fa1', breed: 'Black Angel Fish', category: 'Fish', subcategory: 'Angel', gender: 'Pair', ageMonths: 2, isVaccinated: false, price: 200, imageUrl: '/images/clean/angel_fish_black.jpg', description: 'Black Angel fish.' },
  { id: 'fa2', breed: 'Koi Angel Fish', category: 'Fish', subcategory: 'Angel', gender: 'Pair', ageMonths: 2, isVaccinated: false, price: 250, imageUrl: '/images/clean/angel_fish_koi_angel.jpg', description: 'Koi Angel fish.' },
  { id: 'fa3', breed: 'Silver Angel Fish', category: 'Fish', subcategory: 'Angel', gender: 'Pair', ageMonths: 2, isVaccinated: false, price: 180, imageUrl: '/images/clean/angel_fish_silver_angel.jpg', description: 'Silver Angel fish.' },
  
  { id: 'fs1', breed: 'Alligator Gar', category: 'Fish', subcategory: 'Monster Fish', gender: 'Single', ageMonths: 4, isVaccinated: false, price: 1500, imageUrl: '/images/clean/fish_alligator_gar_fish.jpg', description: 'Monster Alligator Gar.' },
  { id: 'fs2', breed: 'Flower Horn', category: 'Fish', subcategory: 'Monster Fish', gender: 'Single', ageMonths: 5, isVaccinated: false, price: 3500, imageUrl: '/images/clean/fish_flower_horn_fish.jpg', description: 'Premium Flower Horn.' },

  // BIRDS -> COCKTAIL, DOVE, LOVE BIRDS
  { id: 'b1', breed: 'Grey Cocktail', category: 'Birds', subcategory: 'Cocktail', gender: 'Pair', ageMonths: 6, isVaccinated: true, price: 3500, imageUrl: '/images/clean/cocktail_bird_grey.jpg', description: 'Grey Cocktail pair.' },
  { id: 'b2', breed: 'Lutino Cocktail', category: 'Birds', subcategory: 'Cocktail', gender: 'Pair', ageMonths: 6, isVaccinated: true, price: 4000, imageUrl: '/images/clean/cocktail_bird_lutino.jpg', description: 'Lutino Cocktail pair.' },
  { id: 'b3', breed: 'Albino Cocktail', category: 'Birds', subcategory: 'Cocktail', gender: 'Pair', ageMonths: 6, isVaccinated: true, price: 4500, imageUrl: '/images/clean/cocktail_bird_albino.jpg', description: 'Albino Cocktail pair.' },
  
  { id: 'b4', breed: 'American Tail Dove', category: 'Birds', subcategory: 'Dove', gender: 'Pair', ageMonths: 8, isVaccinated: true, price: 2500, imageUrl: '/images/clean/dove_bird_american_tail.jpg', description: 'American Tail Dove pair.' },
  { id: 'b5', breed: 'British Fantail Dove', category: 'Birds', subcategory: 'Dove', gender: 'Pair', ageMonths: 8, isVaccinated: true, price: 3500, imageUrl: '/images/clean/dove_bird_british_fantail.jpg', description: 'British Fantail Dove pair.' },
  { id: 'b6', breed: 'Cover Head Dove', category: 'Birds', subcategory: 'Dove', gender: 'Pair', ageMonths: 8, isVaccinated: true, price: 2000, imageUrl: '/images/clean/dove_bird_cover_head.jpg', description: 'Cover Head Dove pair.' },
  { id: 'b7', breed: 'King Dove', category: 'Birds', subcategory: 'Dove', gender: 'Pair', ageMonths: 8, isVaccinated: true, price: 3000, imageUrl: '/images/clean/dove_bird_king_dove.jpg', description: 'King Dove pair.' },
  { id: 'b8', breed: 'Lahore Dove', category: 'Birds', subcategory: 'Dove', gender: 'Pair', ageMonths: 8, isVaccinated: true, price: 2800, imageUrl: '/images/clean/dove_bird_lahore.jpg', description: 'Lahore Dove pair.' },
  { id: 'b9', breed: 'Owl Dove', category: 'Birds', subcategory: 'Dove', gender: 'Pair', ageMonths: 8, isVaccinated: true, price: 4000, imageUrl: '/images/clean/dove_bird_owl_dove.jpg', description: 'Owl Dove pair.' },

  { id: 'b10', breed: 'Helicopter Love Bird', category: 'Birds', subcategory: 'Love Birds', gender: 'Pair', ageMonths: 4, isVaccinated: false, price: 1500, imageUrl: '/images/clean/love_bird_helicopter.jpg', description: 'Helicopter Love Bird pair.' },
  { id: 'b11', breed: 'Budgie', category: 'Birds', subcategory: 'Love Birds', gender: 'Pair', ageMonths: 3, isVaccinated: false, price: 600, imageUrl: '/images/clean/love_birds_budgie.jpg', description: 'Budgie pair.' },
  { id: 'b12', breed: 'Show Budgie', category: 'Birds', subcategory: 'Love Birds', gender: 'Pair', ageMonths: 4, isVaccinated: false, price: 1200, imageUrl: '/images/clean/love_birds_show_budgie.jpg', description: 'Premium Show Budgie pair.' },

  // SMALL ANIMALS
  { id: 's1', breed: 'Guinea Pig', category: 'Small Animals', subcategory: 'Small Animals', gender: 'Female', ageMonths: 3, isVaccinated: true, price: 1500, imageUrl: '/images/clean/guneia_pig.jpg', description: 'Cute Guinea Pig.' },
  { id: 's2', breed: 'Hamster', category: 'Small Animals', subcategory: 'Small Animals', gender: 'Male', ageMonths: 2, isVaccinated: false, price: 800, imageUrl: '/images/clean/hamster.jpg', description: 'Active Hamster.' },
  { id: 's3', breed: 'Rabbit', category: 'Small Animals', subcategory: 'Small Animals', gender: 'Male', ageMonths: 2, isVaccinated: true, price: 1200, imageUrl: '/images/clean/rabbit.jpg', description: 'Fluffy Rabbit.' },

  // SUPPLIES
  { id: 'sup1', breed: 'Dog Food Bowl', category: 'Supplies', subcategory: 'Dog Supplies', gender: 'Accessory', ageMonths: 0, isVaccinated: false, price: 300, imageUrl: '/images/clean/dog_food_bowl.jpg', description: 'Durable Dog Food Bowl.' },
  { id: 'sup2', breed: 'Dog Comb', category: 'Supplies', subcategory: 'Dog Supplies', gender: 'Accessory', ageMonths: 0, isVaccinated: false, price: 250, imageUrl: '/images/clean/dog_comb.jpg', description: 'Steel Dog Comb.' },
  { id: 'sup3', breed: 'Dog Shampoo', category: 'Supplies', subcategory: 'Dog Supplies', gender: 'Accessory', ageMonths: 0, isVaccinated: false, price: 400, imageUrl: '/images/clean/dog_shampoo.jpg', description: 'Premium Dog Shampoo.' },
  { id: 'sup4', breed: 'Dog Travel Bag', category: 'Supplies', subcategory: 'Dog Supplies', gender: 'Accessory', ageMonths: 0, isVaccinated: false, price: 1200, imageUrl: '/images/clean/dog_travel_bag.jpg', description: 'Comfortable Travel Bag.' },

  { id: 'sup5', breed: 'Cat Feeder', category: 'Supplies', subcategory: 'Cat Supplies', gender: 'Accessory', ageMonths: 0, isVaccinated: false, price: 350, imageUrl: '/images/clean/cat_accessories_cat_feeder.jpg', description: 'Automatic Cat Feeder.' },
  { id: 'sup6', breed: 'Cat Brush', category: 'Supplies', subcategory: 'Cat Supplies', gender: 'Accessory', ageMonths: 0, isVaccinated: false, price: 200, imageUrl: '/images/clean/cat_accessories_cat_brush.jpg', description: 'Soft Cat Brush.' },
  { id: 'sup7', breed: 'Cat Shampoo', category: 'Supplies', subcategory: 'Cat Supplies', gender: 'Accessory', ageMonths: 0, isVaccinated: false, price: 300, imageUrl: '/images/clean/cat_accessories_cat_shampoo.jpg', description: 'Cat Shampoo.' },
  { id: 'sup8', breed: 'Me-O Cat Food', category: 'Supplies', subcategory: 'Cat Supplies', gender: 'Food', ageMonths: 0, isVaccinated: false, price: 450, imageUrl: '/images/clean/cat_food_me_o.jpg', description: 'Me-O Dry Cat Food.' },

  { id: 'sup9', breed: 'Fish Bowl', category: 'Supplies', subcategory: 'Fish Supplies', gender: 'Accessory', ageMonths: 0, isVaccinated: false, price: 500, imageUrl: '/images/clean/fish_accessories_fish_bowl.jpg', description: 'Glass Fish Bowl.' },
  { id: 'sup10', breed: 'Fish Net', category: 'Supplies', subcategory: 'Fish Supplies', gender: 'Accessory', ageMonths: 0, isVaccinated: false, price: 100, imageUrl: '/images/clean/fish_accessories_fish_net.jpg', description: 'Aquarium Fish Net.' },
  { id: 'sup11', breed: 'Tank Heater', category: 'Supplies', subcategory: 'Fish Supplies', gender: 'Accessory', ageMonths: 0, isVaccinated: false, price: 800, imageUrl: '/images/clean/fish_accessories_fisk_tank_heater.jpg', description: 'Aquarium Heater.' },
  { id: 'sup12', breed: 'Tank Sand', category: 'Supplies', subcategory: 'Fish Supplies', gender: 'Accessory', ageMonths: 0, isVaccinated: false, price: 250, imageUrl: '/images/clean/fish_tank_sand.jpg', description: 'Aquarium Sand.' }
];

export const ShopProvider = ({ children }) => {
  const [pets, setPets] = useState(initialPets);

  return (
    <ShopContext.Provider value={{ pets, setPets }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => useContext(ShopContext);

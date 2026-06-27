import React, { createContext, useContext, useState } from 'react';

const ShopContext = createContext();

const initialPets = [
  // DOGS
  { id: 'd1', breed: 'Pug', category: 'Dogs', subcategory: 'Dogs', gender: 'Male', ageMonths: 2, isVaccinated: true, price: 15000, imageUrl: '/images/Dog image/Dog image/Dog - pug .jpg', description: 'Cute and playful pug puppy.' },
  { id: 'd2', breed: 'Labrador', category: 'Dogs', subcategory: 'Dogs', gender: 'Female', ageMonths: 2, isVaccinated: true, price: 18000, imageUrl: '/images/Dog image/Dog image/Dog- Labrador.jpg', description: 'Friendly and energetic Labrador.' },
  { id: 'd3', breed: 'Beagle', category: 'Dogs', subcategory: 'Dogs', gender: 'Male', ageMonths: 3, isVaccinated: true, price: 20000, imageUrl: '/images/Dog image/Dog image/Dog- beagle.jpg', description: 'Curious and loving Beagle puppy.' },
  { id: 'd4', breed: 'German Shepherd', category: 'Dogs', subcategory: 'Dogs', gender: 'Male', ageMonths: 2, isVaccinated: true, price: 25000, imageUrl: '/images/Dog image/Dog image/Dog- german Shepherd.jpg', description: 'Strong and loyal German Shepherd.' },
  { id: 'd5', breed: 'Golden Retriever', category: 'Dogs', subcategory: 'Dogs', gender: 'Female', ageMonths: 2, isVaccinated: true, price: 22000, imageUrl: '/images/Dog image/Dog image/Dog- golden retriever.jpg', description: 'Gentle and affectionate Golden Retriever.' },

  // CATS
  { id: 'c1', breed: 'Maine Coon', category: 'Cats', subcategory: 'Cats', gender: 'Male', ageMonths: 4, isVaccinated: true, price: 35000, imageUrl: '/images/Cat image/Cat image/Cat- maine Coon cat.jpg', description: 'Majestic Maine Coon kitten.' },
  { id: 'c2', breed: 'Bengal Cat', category: 'Cats', subcategory: 'Cats', gender: 'Female', ageMonths: 3, isVaccinated: true, price: 40000, imageUrl: '/images/Cat image/Cat image/Cat-Bengal cat.jpg', description: 'Exotic Bengal kitten.' },
  { id: 'c3', breed: 'Persian Cat', category: 'Cats', subcategory: 'Cats', gender: 'Female', ageMonths: 2, isVaccinated: true, price: 18000, imageUrl: '/images/Cat image/Cat image/Cat-Persian cat.jpg', description: 'Fluffy white Persian kitten.', faceType: 'Doll Face' },
  { id: 'c4', breed: 'Short Hair', category: 'Cats', subcategory: 'Cats', gender: 'Male', ageMonths: 2, isVaccinated: false, price: 8000, imageUrl: '/images/Cat image/Cat image/Cat-short hair.jpg', description: 'Playful domestic short hair.' },
  { id: 'c5', breed: 'Siamese Cat', category: 'Cats', subcategory: 'Cats', gender: 'Female', ageMonths: 3, isVaccinated: true, price: 25000, imageUrl: '/images/Cat image/Cat image/Cat-siamese cat.jpg', description: 'Elegant Siamese kitten.' },

  // FISH -> GUPPY
  { id: 'f1', breed: 'Albino Guppy', category: 'Fish', subcategory: 'Guppy', gender: 'Pair', ageMonths: 1, isVaccinated: false, price: 150, imageUrl: '/images/Guppy_fish-_albino_guppy.jpg', description: 'Beautiful Albino Guppy pair.' },
  { id: 'f2', breed: 'Black Guppy', category: 'Fish', subcategory: 'Guppy', gender: 'Pair', ageMonths: 1, isVaccinated: false, price: 120, imageUrl: '/images/Guppy_fish-_black_guppy.jpg', description: 'Sleek Black Guppy pair.' },
  { id: 'f3', breed: 'Blue Guppy', category: 'Fish', subcategory: 'Guppy', gender: 'Pair', ageMonths: 1, isVaccinated: false, price: 140, imageUrl: '/images/Guppy_fish-_blue_guppy.jpg', description: 'Vibrant Blue Guppy pair.' },
  { id: 'f4', breed: 'Fancy Guppy', category: 'Fish', subcategory: 'Guppy', gender: 'Pair', ageMonths: 1, isVaccinated: false, price: 200, imageUrl: '/images/Guppy_fish-_fancy_guppy.jpg', description: 'Colorful Fancy Guppy pair.' },
  { id: 'f5', breed: 'Red Tail Guppy', category: 'Fish', subcategory: 'Guppy', gender: 'Pair', ageMonths: 1, isVaccinated: false, price: 130, imageUrl: '/images/Guppy_fish-_red_tail.jpg', description: 'Red Tail Guppy pair.' },
  { id: 'f6', breed: 'Snake Guppy', category: 'Fish', subcategory: 'Guppy', gender: 'Pair', ageMonths: 1, isVaccinated: false, price: 180, imageUrl: '/images/Guppy_fish-_snake_guppy_fish.jpg', description: 'Exotic Snake Guppy pair.' },
  { id: 'f7', breed: 'Spotted Guppy', category: 'Fish', subcategory: 'Guppy', gender: 'Pair', ageMonths: 1, isVaccinated: false, price: 160, imageUrl: '/images/Guppy_fish-_spotted_guppy.jpg', description: 'Spotted Guppy pair.' },

  // FISH -> BETTA
  { id: 'fb1', breed: 'Half Moon Betta', category: 'Fish', subcategory: 'Betta', gender: 'Male', ageMonths: 2, isVaccinated: false, price: 350, imageUrl: '/images/Betta_fish-_half_moon.jpg', description: 'Stunning Half Moon Betta.' },
  { id: 'fb2', breed: 'Alien Betta', category: 'Fish', subcategory: 'Betta', gender: 'Male', ageMonths: 2, isVaccinated: false, price: 450, imageUrl: '/images/Betta_fish_-_ailen.jpg', description: 'Rare Alien Betta.' },
  { id: 'fb3', breed: 'Full Moon Betta', category: 'Fish', subcategory: 'Betta', gender: 'Male', ageMonths: 2, isVaccinated: false, price: 400, imageUrl: '/images/Betta_fish_-_full_moon.jpg', description: 'Beautiful Full Moon Betta.' },
  { id: 'fb4', breed: 'Samurai Betta', category: 'Fish', subcategory: 'Betta', gender: 'Male', ageMonths: 2, isVaccinated: false, price: 500, imageUrl: '/images/Betta_fish_-_samurai.jpg', description: 'Fierce Samurai Betta.' },
  { id: 'fb5', breed: 'Wild Betta', category: 'Fish', subcategory: 'Betta', gender: 'Male', ageMonths: 2, isVaccinated: false, price: 300, imageUrl: '/images/Betta_fish_-_wild.jpg', description: 'Natural Wild Betta.' },

  // FISH -> GOLDFISH
  { id: 'fg1', breed: 'Black Goldfish', category: 'Fish', subcategory: 'Goldfish', gender: 'Pair', ageMonths: 2, isVaccinated: false, price: 250, imageUrl: '/images/Gold_fish-_black_gold.jpg', description: 'Jet black goldfish.' },
  { id: 'fg2', breed: 'Bommer Head Goldfish', category: 'Fish', subcategory: 'Goldfish', gender: 'Pair', ageMonths: 3, isVaccinated: false, price: 600, imageUrl: '/images/Gold_fish-_bommer_head.jpg', description: 'Premium Bommer Head.' },
  { id: 'fg3', breed: 'Koi Goldfish', category: 'Fish', subcategory: 'Goldfish', gender: 'Pair', ageMonths: 2, isVaccinated: false, price: 400, imageUrl: '/images/Gold_fish-_koi_gold.jpg', description: 'Koi patterned goldfish.' },
  { id: 'fg4', breed: 'Normal Goldfish', category: 'Fish', subcategory: 'Goldfish', gender: 'Pair', ageMonths: 2, isVaccinated: false, price: 150, imageUrl: '/images/Gold_fish-_normal.jpg', description: 'Classic goldfish.' },
  { id: 'fg5', breed: 'Double Wing Goldfish', category: 'Fish', subcategory: 'Goldfish', gender: 'Pair', ageMonths: 2, isVaccinated: false, price: 300, imageUrl: '/images/Gold_fish_-_double_wing.jpg', description: 'Elegant double wing goldfish.' },

  // FISH -> MOLLY & PLATY & ANGEL & OTHERS
  { id: 'fm1', breed: 'Black Molly', category: 'Fish', subcategory: 'Molly', gender: 'Pair', ageMonths: 1, isVaccinated: false, price: 80, imageUrl: '/images/Molly_fish-_black_molly.jpg', description: 'Black Molly pair.' },
  { id: 'fm2', breed: 'Ballon Molly', category: 'Fish', subcategory: 'Molly', gender: 'Pair', ageMonths: 1, isVaccinated: false, price: 120, imageUrl: '/images/Molly_fish_-_ballon_molly.jpg', description: 'Ballon Molly pair.' },
  { id: 'fm3', breed: 'Chocolate Molly', category: 'Fish', subcategory: 'Molly', gender: 'Pair', ageMonths: 1, isVaccinated: false, price: 100, imageUrl: '/images/Molly_fish_-_chocolate_molly.jpg', description: 'Chocolate Molly pair.' },
  { id: 'fm4', breed: 'Spotted Molly', category: 'Fish', subcategory: 'Molly', gender: 'Pair', ageMonths: 1, isVaccinated: false, price: 90, imageUrl: '/images/Molly_fish_-_spotted.jpg', description: 'Spotted Molly pair.' },

  { id: 'fp1', breed: 'Red Platy', category: 'Fish', subcategory: 'Platy', gender: 'Pair', ageMonths: 1, isVaccinated: false, price: 100, imageUrl: '/images/Platy_fish-_Red_platy_fish.jpg', description: 'Red Platy pair.' },
  { id: 'fp2', breed: 'Micky Mouse Platy', category: 'Fish', subcategory: 'Platy', gender: 'Pair', ageMonths: 1, isVaccinated: false, price: 150, imageUrl: '/images/Platy_fish-Micky_mouse_platy_f.jpg', description: 'Micky Mouse Platy pair.' },
  { id: 'fp3', breed: 'Blue Platy', category: 'Fish', subcategory: 'Platy', gender: 'Pair', ageMonths: 1, isVaccinated: false, price: 120, imageUrl: '/images/Platy_fish_-_blue_platy.jpg', description: 'Blue Platy pair.' },

  { id: 'fa1', breed: 'Black Angel Fish', category: 'Fish', subcategory: 'Angel', gender: 'Pair', ageMonths: 2, isVaccinated: false, price: 200, imageUrl: '/images/Angel_fish-_black.jpg', description: 'Black Angel fish.' },
  { id: 'fa2', breed: 'Koi Angel Fish', category: 'Fish', subcategory: 'Angel', gender: 'Pair', ageMonths: 2, isVaccinated: false, price: 250, imageUrl: '/images/Angel_fish-_koi_angel.jpg', description: 'Koi Angel fish.' },
  { id: 'fa3', breed: 'Silver Angel Fish', category: 'Fish', subcategory: 'Angel', gender: 'Pair', ageMonths: 2, isVaccinated: false, price: 180, imageUrl: '/images/Angel_fish_-_silver_angel.jpg', description: 'Silver Angel fish.' },
  
  { id: 'fs1', breed: 'Alligator Gar', category: 'Fish', subcategory: 'Monster Fish', gender: 'Single', ageMonths: 4, isVaccinated: false, price: 1500, imageUrl: '/images/Fish--Alligator_gar_fish.jpg', description: 'Monster Alligator Gar.' },
  { id: 'fs2', breed: 'Flower Horn', category: 'Fish', subcategory: 'Monster Fish', gender: 'Single', ageMonths: 5, isVaccinated: false, price: 3500, imageUrl: '/images/Fish--Flower_horn_fish.jpg', description: 'Premium Flower Horn.' },

  // BIRDS -> COCKTAIL, DOVE, LOVE BIRDS
  { id: 'b1', breed: 'Grey Cocktail', category: 'Birds', subcategory: 'Cocktail', gender: 'Pair', ageMonths: 6, isVaccinated: true, price: 3500, imageUrl: '/images/Cocktail_bird-_grey.jpg', description: 'Grey Cocktail pair.' },
  { id: 'b2', breed: 'Lutino Cocktail', category: 'Birds', subcategory: 'Cocktail', gender: 'Pair', ageMonths: 6, isVaccinated: true, price: 4000, imageUrl: '/images/Cocktail_bird-_lutino.jpg', description: 'Lutino Cocktail pair.' },
  { id: 'b3', breed: 'Albino Cocktail', category: 'Birds', subcategory: 'Cocktail', gender: 'Pair', ageMonths: 6, isVaccinated: true, price: 4500, imageUrl: '/images/Cocktail_bird_-_albino.jpg', description: 'Albino Cocktail pair.' },
  
  { id: 'b4', breed: 'American Tail Dove', category: 'Birds', subcategory: 'Dove', gender: 'Pair', ageMonths: 8, isVaccinated: true, price: 2500, imageUrl: '/images/Dove_bird-_American_tail.jpg', description: 'American Tail Dove pair.' },
  { id: 'b5', breed: 'British Fantail Dove', category: 'Birds', subcategory: 'Dove', gender: 'Pair', ageMonths: 8, isVaccinated: true, price: 3500, imageUrl: '/images/Dove_bird-_British_fantail.jpg', description: 'British Fantail Dove pair.' },
  { id: 'b6', breed: 'Cover Head Dove', category: 'Birds', subcategory: 'Dove', gender: 'Pair', ageMonths: 8, isVaccinated: true, price: 2000, imageUrl: '/images/Dove_bird-_cover_head.jpg', description: 'Cover Head Dove pair.' },
  { id: 'b7', breed: 'King Dove', category: 'Birds', subcategory: 'Dove', gender: 'Pair', ageMonths: 8, isVaccinated: true, price: 3000, imageUrl: '/images/Dove_bird-_king_dove.jpg', description: 'King Dove pair.' },
  { id: 'b8', breed: 'Lahore Dove', category: 'Birds', subcategory: 'Dove', gender: 'Pair', ageMonths: 8, isVaccinated: true, price: 2800, imageUrl: '/images/Dove_bird-_lahore.jpg', description: 'Lahore Dove pair.' },
  { id: 'b9', breed: 'Owl Dove', category: 'Birds', subcategory: 'Dove', gender: 'Pair', ageMonths: 8, isVaccinated: true, price: 4000, imageUrl: '/images/Dove_bird-_owl_dove.jpg', description: 'Owl Dove pair.' },

  { id: 'b10', breed: 'Helicopter Love Bird', category: 'Birds', subcategory: 'Love Birds', gender: 'Pair', ageMonths: 4, isVaccinated: false, price: 1500, imageUrl: '/images/Love_bird-_helicopter.jpg', description: 'Helicopter Love Bird pair.' },
  { id: 'b11', breed: 'Budgie', category: 'Birds', subcategory: 'Love Birds', gender: 'Pair', ageMonths: 3, isVaccinated: false, price: 600, imageUrl: '/images/Love_birds-_budgie.jpg', description: 'Budgie pair.' },
  { id: 'b12', breed: 'Show Budgie', category: 'Birds', subcategory: 'Love Birds', gender: 'Pair', ageMonths: 4, isVaccinated: false, price: 1200, imageUrl: '/images/Love_birds-_show_budgie.jpg', description: 'Premium Show Budgie pair.' },

  // SMALL ANIMALS
  { id: 's1', breed: 'Guinea Pig', category: 'Small Animals', subcategory: 'Small Animals', gender: 'Female', ageMonths: 3, isVaccinated: true, price: 1500, imageUrl: '/images/Small animals/Small animals/Guneia pig.jpg', description: 'Cute Guinea Pig.' },
  { id: 's2', breed: 'Hamster', category: 'Small Animals', subcategory: 'Small Animals', gender: 'Male', ageMonths: 2, isVaccinated: false, price: 800, imageUrl: '/images/Small animals/Small animals/Hamster.jpg', description: 'Active Hamster.' },
  { id: 's3', breed: 'Rabbit', category: 'Small Animals', subcategory: 'Small Animals', gender: 'Male', ageMonths: 2, isVaccinated: true, price: 1200, imageUrl: '/images/Small animals/Small animals/Rabbit.jpg', description: 'Fluffy Rabbit.' },

  // SUPPLIES
  { id: 'sup1', breed: 'Dog Food Bowl', category: 'Supplies', subcategory: 'Dog Supplies', gender: 'Accessory', ageMonths: 0, isVaccinated: false, price: 300, imageUrl: '/images/Dog_Food_bowl.jpg', description: 'Durable Dog Food Bowl.' },
  { id: 'sup2', breed: 'Dog Comb', category: 'Supplies', subcategory: 'Dog Supplies', gender: 'Accessory', ageMonths: 0, isVaccinated: false, price: 250, imageUrl: '/images/Dog_comb.jpg', description: 'Steel Dog Comb.' },
  { id: 'sup3', breed: 'Dog Shampoo', category: 'Supplies', subcategory: 'Dog Supplies', gender: 'Accessory', ageMonths: 0, isVaccinated: false, price: 400, imageUrl: '/images/Dog_shampoo.jpg', description: 'Premium Dog Shampoo.' },
  { id: 'sup4', breed: 'Dog Travel Bag', category: 'Supplies', subcategory: 'Dog Supplies', gender: 'Accessory', ageMonths: 0, isVaccinated: false, price: 1200, imageUrl: '/images/Dog_travel_bag.jpg', description: 'Comfortable Travel Bag.' },

  { id: 'sup5', breed: 'Cat Feeder', category: 'Supplies', subcategory: 'Cat Supplies', gender: 'Accessory', ageMonths: 0, isVaccinated: false, price: 350, imageUrl: '/images/Cat_accessories-_cat_feeder.jpg', description: 'Automatic Cat Feeder.' },
  { id: 'sup6', breed: 'Cat Brush', category: 'Supplies', subcategory: 'Cat Supplies', gender: 'Accessory', ageMonths: 0, isVaccinated: false, price: 200, imageUrl: '/images/Cat_accessories-_cat_brush.jpg', description: 'Soft Cat Brush.' },
  { id: 'sup7', breed: 'Cat Shampoo', category: 'Supplies', subcategory: 'Cat Supplies', gender: 'Accessory', ageMonths: 0, isVaccinated: false, price: 300, imageUrl: '/images/Cat_accessories-_cat_shampoo.jpg', description: 'Cat Shampoo.' },
  { id: 'sup8', breed: 'Me-O Cat Food', category: 'Supplies', subcategory: 'Cat Supplies', gender: 'Food', ageMonths: 0, isVaccinated: false, price: 450, imageUrl: '/images/Cat_food_-_me-o.jpg', description: 'Me-O Dry Cat Food.' },

  { id: 'sup9', breed: 'Fish Bowl', category: 'Supplies', subcategory: 'Fish Supplies', gender: 'Accessory', ageMonths: 0, isVaccinated: false, price: 500, imageUrl: '/images/Fish_accessories-_fish_bowl.jpg', description: 'Glass Fish Bowl.' },
  { id: 'sup10', breed: 'Fish Net', category: 'Supplies', subcategory: 'Fish Supplies', gender: 'Accessory', ageMonths: 0, isVaccinated: false, price: 100, imageUrl: '/images/Fish_accessories-_fish_net.jpg', description: 'Aquarium Fish Net.' },
  { id: 'sup11', breed: 'Tank Heater', category: 'Supplies', subcategory: 'Fish Supplies', gender: 'Accessory', ageMonths: 0, isVaccinated: false, price: 800, imageUrl: '/images/Fish_accessories-_fisk_tank_heater.jpg', description: 'Aquarium Heater.' },
  { id: 'sup12', breed: 'Tank Sand', category: 'Supplies', subcategory: 'Fish Supplies', gender: 'Accessory', ageMonths: 0, isVaccinated: false, price: 250, imageUrl: '/images/Fish_tank_sand.jpg', description: 'Aquarium Sand.' }
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

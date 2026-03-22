// ─── Menu ─────────────────────────────────────────────────
export const MENU = {
  前菜: [
    { name: '鮭魚韃靼', sub: 'Salmon Tartare', desc: '現削鮭魚、酸豆、鱒魚卵、檸檬油醋', price: 680, tag: '主廚推薦' },
    { name: '松露蛋黃醬蘆筍', sub: 'White Asparagus, Truffle', desc: '白蘆筍、黑松露刨片、松露慕斯、榛果油', price: 780, tag: '' },
    { name: '鵝肝慕斯千層', sub: 'Foie Gras Mille-feuille', desc: '鵝肝慕斯、香料蘋果凍、布里歐修脆片', price: 860, tag: '季節限定' },
    { name: '海膽冷湯', sub: 'Sea Urchin Vichyssoise', desc: '北海道海膽、馬鈴薯冷湯、山葵泡沫', price: 920, tag: '' },
  ],
  主菜: [
    { name: '乾式熟成肋眼', sub: '45-Day Dry-Aged Ribeye', desc: '45天乾式熟成、骨髓奶油、芥末葉沙拉', price: 2200, tag: '招牌' },
    { name: '布列塔尼龍蝦', sub: 'Brittany Lobster', desc: '整尾龍蝦、香草奶油、松露義大利麵', price: 1980, tag: '主廚推薦' },
    { name: '和牛菲力', sub: 'A5 Wagyu Filet', desc: 'A5和牛、黑松露醬、煙燻馬鈴薯泥', price: 2800, tag: '頂級' },
    { name: '梭子魚白醬烩飯', sub: 'Pike-Perch Risotto', desc: '法式白醬、帕馬森起司、檸檬奶油', price: 1280, tag: '' },
    { name: '慢燉羊肩', sub: '12-Hour Lamb Shoulder', desc: '12小時慢燉、摩洛哥香料、椰棗泥', price: 1480, tag: '季節限定' },
  ],
  甜點: [
    { name: '焦糖布丁', sub: 'Crème Brûlée', desc: '香草豆莢、焦糖脆殼、夏日莓果', price: 380, tag: '' },
    { name: '黑巧克力熔岩', sub: 'Chocolate Fondant', desc: '72%黑巧克力、榛果冰淇淋、金箔', price: 420, tag: '主廚推薦' },
    { name: '米其林柑橘塔', sub: 'Citrus Tart', desc: '香橙、葡萄柚、馬斯卡彭、百香果凝凍', price: 360, tag: '' },
  ],
  酒單: [
    { name: '勃根地白酒', sub: 'Burgundy Blanc 2021', desc: '法國勃根地、夏多內品種、礦石尾韻', price: 1200, tag: '' },
    { name: '波爾多紅酒', sub: 'Bordeaux Rouge 2019', desc: '梅洛、卡本內、黑醋栗、雪茄香氣', price: 1800, tag: '侍酒師推薦' },
    { name: '香檳', sub: 'Champagne Brut NV', desc: '法國香檳、細緻氣泡、青蘋果、奶油', price: 980, tag: '' },
    { name: '日本清酒', sub: 'Dassai 45 Junmai', desc: '山口縣、山田錦米、果香清雅', price: 880, tag: '' },
  ],
}

export const MENU_CATEGORIES = Object.keys(MENU)

// ─── Time slots ──────────────────────────────────────────
export const LUNCH_SLOTS  = ['12:00', '12:30', '13:00', '13:30', '14:00']
export const DINNER_SLOTS = ['18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00']

export const PARTY_SIZES = [1, 2, 3, 4, 5, 6, 7, 8]

// ─── Gallery images ──────────────────────────────────────
export const GALLERY = [
  { src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=85', alt: '餐廳主廳' },
  { src: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=85', alt: '主廚特製料理' },
  { src: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=85', alt: '精緻擺盤' },
  { src: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=1200&q=85', alt: '季節食材' },
  { src: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200&q=85', alt: '私人包廂' },
  { src: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=1200&q=85', alt: '主廚' },
]

// ─── Team ────────────────────────────────────────────────
export const TEAM = [
  { name: 'Julien Mercier', role: '主廚 / Chef de Cuisine', bio: '法國里昂出身，曾任職巴黎 L\'Ambroisie 與東京 Quintessence。以在地食材詮釋經典法式工藝。', img: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=600&q=80' },
  { name: '陳宛儀', role: '甜點主廚 / Pastry Chef', bio: '法國巴黎藍帶學院畢業，專精法式糕點工藝。以台灣水果與傳統食材創作充滿詩意的甜點。', img: 'https://images.unsplash.com/photo-1607631568010-a87245c0daf8?w=600&q=80' },
  { name: 'Marco Silva', role: '侍酒師 / Sommelier', bio: '葡萄牙波多出身，WSET Level 4 認證。擅長勃根地及自然酒，為每道料理找到最完美的搭配。', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80' },
]

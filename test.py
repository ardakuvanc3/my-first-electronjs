from collections import Counter
import random

# Örnek bir array
array = [5]

# Kaç kez denemek istediğinizi belirleyin
deneme_sayisi = 10000

# Belirli bir sayıyı kaç kez seçtiğimizi saymak için bir Counter oluşturalım
sayac = Counter()

# Belirli bir sayıyı rastgele seçip sayacı güncelleyelim
for _ in range(deneme_sayisi):
    secilen_sayi = random.choice(array)
    sayac[secilen_sayi] += 1

# Belirli bir sayının seçilme olasılığını hesaplayalım
aranan_sayi = 5  # İlgilenilen sayı
olasilik = (sayac[aranan_sayi] / deneme_sayisi)*100

print(f"{aranan_sayi} sayısının seçilme olasılığı: {olasilik}")

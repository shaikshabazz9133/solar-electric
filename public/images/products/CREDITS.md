# Product photography

Three frames per product category, at 4:3 / 1200×900. They do three jobs: the
`-1` frame is the category tile on `/products`, all three are the tab gallery on
the same page, and each of the three products in a category takes one frame for
its card.

**These show the category of kit, not the specific SKU.** NorthPeak, AmpLine,
Aurora and the rest are NorthStar's own product lines, so no stock photograph
can honestly depict them. A representative photo of that class of equipment is
the honest placeholder; a stock shot of a competitor's hardware would not be.
The gallery captions were written against these photos — if you swap a photo,
check its caption still tells the truth.

Paths live on `image` (and `gallery[].src`) in `src/lib/data/products.ts`.
Share-alike (CC BY-SA) images were deliberately avoided: cropping one produces a
derivative that would have to be published under the same licence.

| File | Source | Credit | Licence |
| --- | --- | --- | --- |
| `solar-panels-1.jpg` | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Martin_000407_163308_506901_4578_(36155266293).jpg) | Olivia Martin / U.S. Department of Energy | Public domain |
| `solar-panels-2.jpg` | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Dillon_000054_172707_517918_4578_(36592581282).jpg) | Lindsey Dillon / U.S. Department of Energy | Public domain |
| `solar-panels-3.jpg` | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Dillon_000056_172709_517877_4578_(36365772820).jpg) | Lindsey Dillon / U.S. Department of Energy | Public domain |
| `inverters-1.jpg` | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:20240407-USDA-RD-AR-LSC-D810L-0685_(53892746738).jpg) | USDA | Public domain |
| `inverters-2.jpg` | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Vermont_Law_School_Solar_Panel_Array-4.JPG) | SayCheeeeeese | [CC0](https://creativecommons.org/publicdomain/zero/1.0/) |
| `inverters-3.jpg` | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Solar_inverter_(49773567271).jpg) | Oak Ridge National Laboratory | [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/) |
| `ev-chargers-1.jpg` | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Tesla_Model_S_home_charging_in_Dorchester,_Boston_November_2025.jpg) | 4300streetcar | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) |
| `ev-chargers-2.jpg` | Same frame as `hero/conduit-rough-in.jpg` — see `public/images/hero/CREDITS.md` | PEO ACWA | [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/) |
| `ev-chargers-3.jpg` | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Electric_car_charging_points,_Trenwith_Car_Park,_St_Ives,_Cornwall_-_May_2025.jpg) | Mutney | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) |
| `battery-storage-1.jpg` | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Bennett_000168_172465_517712_4578_(35949064824).jpg) | U.S. Department of Energy | Public domain |
| `battery-storage-2.jpg` | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Electricians_fixing_electricity_meter_5.jpg) | Jeromi Mikhael | [CC0](https://creativecommons.org/publicdomain/zero/1.0/) |
| `battery-storage-3.jpg` | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Tesvolt_battery_energy_storage_system_Rheineck.jpg) | Kecko | [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/) |
| `heat-pump-1.jpg` | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Newly_installed_heat_pump_Viessmann_Energycal_AW_PRO_AT_70.2,_November_2021,_Tomaszów_Mazowiecki,_Sikorskiego_Street.jpg) | WrS.tm.pl | Public domain |
| `heat-pump-2.jpg` | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Heat_pump_on_a_wall.jpg) | Alexarje | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) |
| `heat-pump-3.jpg` | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Heat_pump_control_panel_repair.jpg) | Shixart1985 | [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/) |
| `ceiling-vacuum-1.jpg` | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Insulating_attic_(49525467656).jpg) | USFWS Mountain-Prairie | Public domain |
| `ceiling-vacuum-2.jpg` | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:St._Paul_Sites--24,_TPA_9i,_E-Shop-Radio_Building_and_Duplex_-_DPLA_-_42ff790adb443f634b531f99e36d0166.JPG) | NOAA / U.S. Department of Commerce | Public domain |
| `ceiling-vacuum-3.jpg` | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:06_Thermal_insulation_retrofit_works_on_a_department_store_building_with_mineral_wool_and_Aluthermo_aluminium_composite_mat.jpg) | Marek Ślusarczyk (Tupungato) | [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/) |
| `ceiling-insulation-1.jpg` | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Installing_installation_in_an_attic_(9337).jpg) | The EnergySmart Academy | [CC0](https://creativecommons.org/publicdomain/zero/1.0/) |
| `ceiling-insulation-2.jpg` | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Sanierung_(6891533025).jpg) | EnergieAgentur.NRW | [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/) |
| `ceiling-insulation-3.jpg` | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Moscow,_Lefortovsky_Val_24,_pile_of_mineral_wool_mats_(31136798850).jpg) | Gennady Grachev | [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/) |

Reused elsewhere on the site, because no second licence-clean photo of the
subject existed: `battery-storage-2.jpg` (also `services/meter-box-upgrade.jpg`),
`battery-storage-3.jpg` (also `projects/cedar-park-microgrid.jpg`) and
`ev-chargers-1.jpg` (also `services/ev-charger.jpg`). They never appear on the
same page as each other.

The CC BY files require visible attribution wherever they are published — the
same outstanding requirement carried by the hero, services and projects credits
files. One credit line covering all four sets would satisfy every one of them.

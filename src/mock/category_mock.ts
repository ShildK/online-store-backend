import { Category } from "../models/category";

export const categories: Category[] = [
   {
      id: 1,
      parentId: undefined,
      name: "Свежие овощи, фрукты",
      icon: "https://arbuz.kz/image/s3/arbuz-kz-catalogs/225164-svezhie_ovoshi_i_frukty.svg",
   },
   {
      id: 2,
      parentId: undefined,
      name: "Молоко, сыр, масло, яйца",
      icon: "https://arbuz.kz/image/s3/arbuz-kz-catalogs/225161-moloko_syr_maslo_yaica.svg",
   },
   {
      id: 3,
      parentId: undefined,
      name: "Сладости",
      icon: "https://arbuz.kz/image/s3/arbuz-kz-catalogs/225166-sladosti.svg",
   },
   {
      id: 4,
      parentId: 1,
      name: "Фрукты",
      icon: "https://arbuz.kz/image/s3/arbuz-kz-catalogs/225177-frukty.png?w=140&h=%h&_c=1661257436",
   },
   {
      id: 5,
      parentId: 1,
      name: "Овощи",
      icon: "https://arbuz.kz/image/s3/arbuz-kz-catalogs/225178-ovoshi.png?w=140&h=%h&_c=1661257454",
   },
   {
      id: 6,
      parentId: 2,
      name: "Молоко",
      icon: "https://arbuz.kz/image/s3/arbuz-kz-catalogs/19986-moloko_smetana_maslo.png?w=140&h=%h&_c=1703062029",
   },
   {
      id: 7,
      parentId: 2,
      name: "Сыр",
      icon: "https://arbuz.kz/image/s3/arbuz-kz-catalogs/20160-syry.png?w=140&h=%h&_c=1661258680",
   },
   {
      id: 8,
      parentId: 2,
      name: "Масло",
      icon: "https://arbuz.kz/image/s3/arbuz-kz-catalogs/225446-slivochnoe_maslo.jpg?w=140&h=%h&_c=1689717880",
   },
   {
      id: 9,
      parentId: 2,
      name: "Яйца",
      icon: "https://arbuz.kz/image/s3/arbuz-kz-catalogs/225245-yaica.png?w=140&h=%h&_c=1661258649",
   },
   {
      id: 10,
      parentId: 3,
      name: "Конфеты",
      icon: "https://arbuz.kz/image/s3/arbuz-kz-catalogs/225041-konfety.png?w=140&h=%h&_c=1670905863",
   },
   {
      id: 11,
      parentId: 3,
      name: "Шокодад",
      icon: "https://arbuz.kz/image/s3/arbuz-kz-catalogs/225247-shokolad_batonchiki_pasta.png?w=140&h=%h&_c=1670905869",
   },
   {
      id: 12,
      parentId: 3,
      name: "Печенье",
      icon: "https://arbuz.kz/image/s3/arbuz-kz-catalogs/225042-pechene_vafli_torty.png?w=140&h=%h&_c=1670905869",
   },
];

'use client';

import { useLanguage } from './LanguageContext';
import menuEn from '@data/locales/menu.en.json';
import menuAm from '@data/locales/menu.am.json';
import MenuData from '@data/menu.json';

const menus = {
  en: menuEn,
  am: menuAm,
};

export function useTranslatedMenu() {
  const { language } = useLanguage();
  const menuTranslations = menus[language];

  // Translate a dish by its slug
  const translateDish = (title) => {
    const slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '');
    const dishData = menuTranslations?.dishes?.[slug];
    return dishData || { title, text: '' };
  };

  // Get translated category name and description
  const translateCategory = (originalName) => {
    const categoryIdx = MenuData.categories.findIndex(
      (cat) => cat.name === originalName
    );
    if (categoryIdx === -1) return { name: originalName, description: '' };
    
    const translatedCat = menuTranslations?.categories?.[categoryIdx];
    return translatedCat || { name: originalName, description: '' };
  };

  // Get fully translated menu data
  const getTranslatedMenuData = () => {
    return {
      ...MenuData,
      categories: MenuData.categories.map((category, idx) => {
        const translated = menuTranslations?.categories?.[idx] || {};
        return {
          ...category,
          name: translated.name || category.name,
          description: translated.description || category.description,
          items: category.items.map((item) => {
            const dishTranslation = translateDish(item.title);
            return {
              ...item,
              title: dishTranslation.title || item.title,
              text: dishTranslation.text || item.text,
            };
          }),
        };
      }),
    };
  };

  return {
    translateDish,
    translateCategory,
    getTranslatedMenuData,
    menuTranslations,
  };
}

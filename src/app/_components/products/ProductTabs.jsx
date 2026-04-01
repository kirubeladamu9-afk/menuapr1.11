"use client";

import Isotope from "isotope-layout";
import { useEffect, useRef, useState } from "react";

const ProductTabs = ({items, active}) => {
  // Isotope
  const isotope = useRef();
  const [filterKey, setFilterKey] = useState(active);
  const [isotopeReady, setIsotopeReady] = useState(false);

  useEffect(() => {
      const initIsotope = () => {
          const gridElement = document.querySelector(".sb-masonry-grid");
          if (!gridElement) {
              setTimeout(initIsotope, 100);
              return;
          }

          try {
              isotope.current = new Isotope(gridElement, {
                  itemSelector: ".sb-grid-item",
                  percentPosition: true,
                  masonry: {
                      columnWidth: '.sb-grid-sizer'
                  },
                  transitionDuration: '0.5s',
              });
              setIsotopeReady(true);
          } catch (e) {
              console.error('Isotope initialization error:', e);
          }
      };

      const timer = setTimeout(initIsotope, 300);
      return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
      if (isotope.current && isotopeReady) {
          try {
              filterKey === "*"
              ? isotope.current.arrange({ filter: `*` })
              : isotope.current.arrange({ filter: `.sb-${filterKey}-tab` });
          } catch (e) {
              console.error('Isotope arrangement error:', e);
          }
      }
  }, [filterKey, isotopeReady]);
  
  const handleFilterKeyChange = (key, e) => {
      e.preventDefault();
      setFilterKey(key);
      const filterLinks = document.querySelectorAll(".sb-filter a");
      filterLinks.forEach((filter) => {
          const filterValue = filter.getAttribute("data-filter");
          if (filterValue == 'sb-'+key+'-tab') {
              filter.classList.add("sb-active");
          } else {
              filter.classList.remove("sb-active");
          }
      });
  };

  return (
    <>   
      {/* filter */}
      <div className="sb-filter">
        {items.map((tab, key) => (
        <a href="#." data-filter={`sb-${tab.slug}-tab`} key={`product-tabs-item-${key}`} className={tab.slug == active ? "sb-filter-link sb-active" : "sb-filter-link"} onClick={(e) => handleFilterKeyChange(tab.slug, e)}>{tab.name}</a>
        ))}
      </div>
      {/* filter end */}
    </>
  );
};
export default ProductTabs;

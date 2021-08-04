import { AREA_RANGES } from '@constants';

export const getMaterialsCount = (boatRamps) => {
  if (!boatRamps?.length) return;

  return boatRamps.reduce((materialsCount, ramp) => {
    const material = ramp.properties.material;
    const rampCount = materialsCount[material];
    if (rampCount) {
      return { ...materialsCount, [material]: rampCount + 1 };
    } else {
      return { ...materialsCount, [material]: 1 };
    }
  }, {});
};

const getAreaRange = (area) => {
  if (!area && area !== 0) return;

  const range = AREA_RANGES.find(({ min, max }) => area >= min && area < max);
  if (!range?.name) return;
  return range.name;
};

export const getAreaRangesCount = (boatRamps) => {
  if (!boatRamps?.length) return;

  return boatRamps.reduce((rangesCount, ramp) => {
    const area = ramp.properties.area_;
    const range = getAreaRange(area);
    const rangeCount = rangesCount[range];

    if (rangeCount) {
      return { ...rangesCount, [range]: rangeCount + 1 };
    } else {
      return { ...rangesCount, [range]: 1 };
    }
  }, {});
};

export const createTripCostTemplate = (points, offers) => {
  const getTotalCost = (points, offers) => {
    let totalCost = 0;
    for (let point of points) {
      totalCost += point.price;
      for (let index of point.options){
        totalCost += offers.get(point.type)[index].price;
      }
    }
    return totalCost;
  }

  return `
    <p class="trip-info__cost">
      Total: &euro;&nbsp;
      <span class="trip-info__cost-value">
        ${getTotalCost(points, offers)}
      </span>
    </p>`;
};
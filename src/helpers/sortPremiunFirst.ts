export function sortPremiunFirst(data: any) {
  return data.sort((a: any, b: any) => {
    if (a?.premium && !b?.premium) {
      return -1;
    } else if (!a.premium && b.premium) {
      return 1;
    } else {
      return 0;
    }
  });
}

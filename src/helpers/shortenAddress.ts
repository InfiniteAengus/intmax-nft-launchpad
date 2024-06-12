export const shortenAddress = (address: string) => {
  if (!address) {
    return null;
  }
  return (
    String(address).substring(0, 6) +
    '...' +
    String(address).substring(address.length - 6)
  );
};

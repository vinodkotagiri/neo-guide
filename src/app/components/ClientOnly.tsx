import React, { useEffect, useState } from 'react';

const ClientOnly = ({ children }:{ children: React.ReactNode }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Don't render anything during SSR
  }

  return <>{children}</>; // Render children only on the client
};

export default ClientOnly;

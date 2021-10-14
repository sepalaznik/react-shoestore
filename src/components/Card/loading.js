import React from "react";
import ContentLoader from "react-content-loader";

const LoadingCard = () => (
    <ContentLoader 
        speed={2}
        width={220}
        height={244}
        viewBox="0 0 220 248"
        backgroundColor="#f3f3f3"
        foregroundColor="#ffffff" 
    >
        <rect x="0" y="0" rx="8" ry="8" width="178" height="150" /> 
        <rect x="0" y="164" rx="4" ry="4" width="178" height="16" /> 
        <rect x="0" y="182" rx="4" ry="4" width="124" height="16" /> 
        <rect x="146" y="212" rx="8" ry="8" width="32" height="32" /> 
        <rect x="0" y="212" rx="4" ry="4" width="100" height="32" />
    </ContentLoader>
)
  
export default LoadingCard;

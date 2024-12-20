source .env

forge script script/Crowdfunding.s.sol:CrowdfundingScript \
  --rpc-url neox \
  --private-key $PRIVATE_KEY \
  --legacy \
  --broadcast \
  --verify \
  --verifier blockscout \
  --verifier-url https://xt4scan.ngd.network/api

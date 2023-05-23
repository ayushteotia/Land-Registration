import { useState, useEffect, useRef } from "react";
import MetaMaskOnboarding from "@metamask/onboarding";
import detectEthereumProvider from "@metamask/detect-provider";
import { app } from "./config";

export const useMetamask = () => {
    const [account, setAccount] = useState("");
    const onboarding = useRef();

    function handleOnboarding() {
        if (MetaMaskOnboarding.isMetaMaskInstalled()) {
            window.ethereum?.request({ method: "eth_requestAccounts" }).then(async (accounts) => {
                console.log("2", accounts);
                if (
                    window.localStorage.getItem("account_hash") !== accounts[0] ||
                    !window.localStorage.getItem("account_type") ||
                    !window.localStorage.getItem("account_name")
                ) {
                    let user = ["Admin"];
                    const isLandInspector = await app.methods.isLandInspector(accounts[0]).call();
                    if (isLandInspector) {
                        window.localStorage.setItem("account_type", "admin");
                        window.localStorage.setItem("account_hash", accounts[0]);
                        window.localStorage.setItem("account_name", user[0]);
                    } else {
                        const isBuyer = await app.methods.isBuyer(accounts[0]).call();
                        if (isBuyer) {
                            user = await app.methods.getBuyerDetails(accounts[0]).call();
                            window.localStorage.setItem("account_type", "buyer");
                            window.localStorage.setItem("account_hash", accounts[0]);
                            window.localStorage.setItem("account_name", user[0]);
                        } else {
                            const isSeller = await app.methods.isSeller(accounts[0]).call();
                            if (isSeller) {
                                user = await app.methods.getSellerDetails(accounts[0]).call();
                                window.localStorage.setItem("account_type", "seller");
                                window.localStorage.setItem("account_hash", accounts[0]);
                                window.localStorage.setItem("account_name", user[0]);
                            } else {
                                window.localStorage.clear();
                            }
                        }
                    }
                }
                window.location.replace("/dashboard");
            });
        } else {
            onboarding.current?.startOnboarding();
        }
    }

    function handleAccountChange(accounts) {
        console.log("1", accounts);
        if (accounts && accounts.length > 0) {
            setAccount(accounts[0]);
        } else {
            setAccount("");
            window.localStorage.clear();
        }
    }

    useEffect(() => {
        if (!onboarding.current) onboarding.current = new MetaMaskOnboarding();
        detectEthereumProvider().then((provider) => {
            if (!provider) return;
            window.ethereum = provider;
            console.log(provider);
        });
        if (window.ethereum) {
            handleAccountChange();
            window.ethereum?.on("accountsChanged", handleAccountChange);
        }
    }, []);

    return { account, handleOnboarding };
};

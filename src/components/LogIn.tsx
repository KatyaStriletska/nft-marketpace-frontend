import { useRef, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Modal } from "bootstrap";
import { Principal } from "@dfinity/principal";
import { AuthClient } from "@dfinity/auth-client";

const LogIn: React.FC = () => {
    const modalRef = useRef<HTMLDivElement | null>(null);
    const [userPrincipal, setUserPrincipal] = useState<Principal | null>(null);
    const [modalInstance, setModalInstance] = useState<Modal | null>(null);

    useEffect(() => {
        checkLoginStatus();
    }, []);

    useEffect(() => {
        if (modalRef.current) {
            const instance = new Modal(modalRef.current);
            setModalInstance(instance);
        }
    }, []);

    const checkLoginStatus = async () => {
        const localStorageWrapper = {
            get: (key: string) => Promise.resolve(localStorage.getItem(key)),
            set: (key: string, value: string) => Promise.resolve(localStorage.setItem(key, value)),
            remove: (key: string) => Promise.resolve(localStorage.removeItem(key)),
        };
        const authClient = await AuthClient.create({ storage: localStorageWrapper });
        if (await authClient.isAuthenticated()) {
            const identity = authClient.getIdentity();
            const principal = identity.getPrincipal().toString();
            localStorage.setItem("userPrincipal", principal);
            setUserPrincipal(identity.getPrincipal());
        } else {
            console.log("User not authenticated");
        }
    };

    const handleLogin = async () => {
        const authClient = await AuthClient.create();
        await authClient.login({
            identityProvider: "https://identity.ic0.app",
            onSuccess: async () => {
                const identity = authClient.getIdentity();
                const principal = identity.getPrincipal().toString();

                console.log("New Login Principal:", principal);

                localStorage.setItem("userPrincipal", principal);
                setUserPrincipal(identity.getPrincipal());

                // Закриваємо модальне вікно після успішного логіну
                if (modalInstance) {
                    modalInstance.hide();
                }
                setTimeout(() => window.location.reload(), 500);

            },
            onError: (err) => console.error("Login failed:", err),
        });
    };

    return (
        <div>
            <button
                type="button"
                className="btn btn-primary"
                onClick={() => modalInstance && modalInstance.show()}
            >
                Login with Internet Identity
            </button>

            <div ref={modalRef} className="modal fade" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-body" style={{ display: "flex", alignItems: "center", justifyContent: "space-around" }}>
                            <button className="btn btn-primary" onClick={handleLogin}>
                                Login with Internet Identity
                            </button>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LogIn;

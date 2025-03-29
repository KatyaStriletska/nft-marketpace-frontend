import { useRef, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Modal } from "bootstrap";
import { Principal } from "@dfinity/principal";
import { AuthClient } from "@dfinity/auth-client";

const LogIn: React.FC = () => {
    const modalRef = useRef<HTMLDivElement | null>(null);
    const [userPrincipal, setUserPrincipal] = useState<Principal | null>(null);
    
      useEffect(() => {
        checkLoginStatus();
      }, []);
    
      const checkLoginStatus = async () => {
        const authClient = await AuthClient.create();
        if (await authClient.isAuthenticated()) {
          const identity = authClient.getIdentity();
          const principal = identity.getPrincipal().toString();
          localStorage.setItem("userPrincipal", principal);
    
          setUserPrincipal(identity.getPrincipal());
        }
      };
    
      const handleLogin = async () => {
        const authClient = await AuthClient.create();
        await authClient.login({
          identityProvider: "https://identity.ic0.app",
          onSuccess: async () => {
            const identity = authClient.getIdentity();
            setUserPrincipal(identity.getPrincipal());
          },
          onError: (err) => console.error("Login failed:", err),
        });
      };
    useEffect(() => {
        if (modalRef.current) {
            new Modal(modalRef.current);
        }
    }, []);

    return (
        <div>
            <button
                type="button"
                className="btn btn-primary"
                onClick={() => modalRef.current && new Modal(modalRef.current).show()}
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
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LogIn;

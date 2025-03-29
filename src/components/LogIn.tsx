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
                Launch demo modal
            </button>

            <div ref={modalRef} className="modal fade" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                        <div>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter your prnamincipal">
                            </input>
                        </div>
                        <button className="btn btn-primary" onClick={handleLogin}>
                            Login with Internet Identity
                        </button>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LogIn;

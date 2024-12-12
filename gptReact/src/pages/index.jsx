import React from "react";

import "../css/main.css";

import { Unauthenticated } from '../login/unauthenticated';
import { Authenticated } from '../login/authenticated';
import { AuthState } from '../login/authState';

export function Index({ user, authState, onAuthChange }) {
    const [userName, setUserName] = React.useState(user);

    function updateUsernameHere() {
        setUserName
    }

    return (
        <main>
            <div>
                {authState === AuthState.Authenticated && (
                    <Authenticated userName={userName} />
                )}
                {authState === AuthState.Unauthenticated && (
                    <Unauthenticated
                        userName={userName}
                        onLogin={(loginUserName) => {
                            onAuthChange(loginUserName, authState);
                        }}
                    />
                )}
            </div>
        </main>
    );
}

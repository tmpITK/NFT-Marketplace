import { AuthClient } from "@dfinity/auth-client";
import React from "react";
import { Button, Form } from "semantic-ui-react";

let localCanisterId;
class Login extends React.Component {


    static async getInitialProps(props) {
        console.log("Props ", props)
        localCanisterId = props.LOCAL_II_CANISTER_ID;
        return {
            LOCAL_II_CANISTER_ID: props.LOCAL_II_CANISTER_ID
        }
    }

    async login() {
        const authClient = await AuthClient.create();

        const days = BigInt(1);
        const hours = BigInt(24);
        const nanoseconds = BigInt(3600000000000);
        console.log(process.env.DFX_NETWORK, "is this ic");

        await authClient.login({
            onSuccess: async() => {
                () => console.log("logged in");
            },
            identityProvider:
            process.env.DFX_NETWORK === 'ic'
                ? "https://identity.ic0.app/#authorize"
                : localCanisterId,
            maxTimeToLive: days * hours * nanoseconds,
        });
    }

    render() {
        return (<Form onSubmit={this.login}>
                    <Button>
                        Login
                    </Button>
                </Form>)
    }

}

export default Login;
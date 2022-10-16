import { AuthClient } from "@dfinity/auth-client";
import React from "react";
import { Button, Form } from "semantic-ui-react";

class Login extends React.Component {
    state = {
        didMount: false,
        localCanisterId: undefined
    }
    constructor(props) {
        super(props);
        this.login = this.login.bind(this)
    }

    componentDidMount() {
        this.setState({ didMount: true, localCanisterId: this.props.LOCAL_II_CANISTER_ID });
    }   

    async login() {
        const authClient = await AuthClient.create();

        const days = BigInt(1);
        const hours = BigInt(24);
        const nanoseconds = BigInt(3600000000000);
        let localIdentityProvider = `http://${this.state.localCanisterId}`;
        console.log(localIdentityProvider)
        await authClient.login({
            onSuccess: async() => {
                () => console.log("logged in");
            },
            identityProvider:
            process.env.DFX_NETWORK === 'ic'
                ? "https://identity.ic0.app/#authorize"
                : localIdentityProvider,
            maxTimeToLive: days * hours * nanoseconds,
        });
    }

    render() {
        return (<Form onSubmit={this.state.didMount ? this.login : () => console.log("Not yet mounted")}>
                    <Button>
                        Login
                    </Button>
                </Form>)
    }

}

export default Login;
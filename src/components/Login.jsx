import {useRef, useState} from "react"
import {Form, Button, Card, Alert} from "react-bootstrap"
import {useAuth} from "../context/AuthContext"
import {Link, useNavigate} from "react-router-dom"
import AuthUiLayout from "./AuthUiLayout.jsx";
import Image from "react-bootstrap/Image";
import GLogo from "../asset/glogo.png";

export default function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()

    const {login, signInUserWithGoogle} = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError("")
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            navigate("/")
        } catch (e) {
            console.error(e)
            setError("Failed to log in")
        }

        setLoading(false)
    }

    const signInWithGoogle = async () => {
        try {
            await signInUserWithGoogle()
            navigate("/")
        } catch (e) {
            console.error(e)
        }
    }


    return (
        <>
            <AuthUiLayout>
                <Card>
                    <Card.Body>
                        <h2 className="text-center mb-4">Log In</h2>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group id="email" className={"mb-3"}>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" ref={emailRef} required/>
                            </Form.Group>
                            <Form.Group id="password" className={"mb-3"}>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" ref={passwordRef} required/>
                            </Form.Group>
                            <Button disabled={loading} className="w-100 mt-4" type="submit">
                                Log In
                            </Button>
                        </Form>
                        <div className="w-100 text-center mt-3">
                            <Link to="/forgot-password">Forgot Password?</Link>
                        </div>
                    </Card.Body>
                </Card>
                <div className="w-100 text-center mt-2">
                    Need an account? <Link to="/signup">Sign Up</Link>
                </div>

                <Card className="mt-5">
                    <Card.Body>
                        <Button onClick={signInWithGoogle} className="w-100 bg-light-subtle " style={{color : "black", fontWeight : "500"}} type="button">
                            Log in With <Image height={20} width={20} src={GLogo} />
                        </Button>
                    </Card.Body>
                </Card>

            </AuthUiLayout>
        </>
    )
}

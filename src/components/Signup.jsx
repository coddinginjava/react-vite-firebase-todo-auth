import { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../context/AuthContext"
import { Link, useNavigate } from "react-router-dom"
import AuthUiLayout from "./AuthUiLayout.jsx";
import Image from "react-bootstrap/Image";
import GLogo from "../asset/glogo.png";


export default function Signup() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const displayNameRef = useRef()
  const { signup, signInUserWithGoogle } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }

    try {
      setError("")
      setLoading(true)
      await signup(emailRef.current.value.trim(), passwordRef.current.value.trim(), displayNameRef.current.value.trim())
      navigate("/")
    } catch (e) {
      console.error(e)
      console.error(e.message)
      setError("Failed to create an account => " + e.message)
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
            <h2 className="text-center mb-4">Sign Up</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email" className={"mb-3"}>
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
              </Form.Group>
              <Form.Group id="password" className={"mb-3"}>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" ref={passwordRef} required />
              </Form.Group>
              <Form.Group id="password-confirm" className={"mb-3"}>
                <Form.Label>Password Confirmation</Form.Label>
                <Form.Control type="password" ref={passwordConfirmRef} required />
              </Form.Group>
              <Form.Group id="displayName" className={"mb-3"}>
                <Form.Label>Display Name</Form.Label>
                <Form.Control type="text" ref={displayNameRef} required />
              </Form.Group>
              <Button disabled={loading} className="w-100 mt-2" type="submit">
                Sign Up
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          Already have an account? <Link to="/login">Log In</Link>
        </div>

        <Card className="mt-5">
          <Card.Body>
            <Button onClick={signInWithGoogle} className="w-100 bg-light-subtle" style={{color : "black", fontWeight : "500"}} type="button">
              Sign in With <Image height={20} width={20} src={GLogo} />
            </Button>
          </Card.Body>
        </Card>


      </AuthUiLayout>

    </>
  )
}

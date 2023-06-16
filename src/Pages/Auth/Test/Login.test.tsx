import React from "react";
import { Login } from "../Login";
import { render, screen, userEvent } from "../../../Utils/test.util";

describe("Login input test", () => {
  it("should return errors when inputs are invalid", async () => {
    render(<Login />);
    const buttonElement = screen.getByText(/log in/i);
    const emailElement = screen.getByLabelText(/email address/i);
    const passwordElement = screen.getByLabelText(/password/i);
    expect(buttonElement).toBeInTheDocument();
    expect(emailElement).toBeInTheDocument();
    expect(passwordElement).toBeInTheDocument();

    await userEvent.click(buttonElement);

    expect(screen.getByText(/please fill in all fields/i));

    await userEvent.type(passwordElement, "TestPass");
    await userEvent.click(buttonElement);
    expect(screen.getByText(/please fill in all fields/i));

    await userEvent.type(emailElement, "an email");
    await userEvent.clear(passwordElement);
    await userEvent.click(buttonElement);
    expect(screen.getByText(/please fill in all fields/i));

    await userEvent.type(emailElement, "invalid email");
    await userEvent.type(passwordElement, "TestPass");
    await userEvent.click(buttonElement);

    expect(screen.getByText(/please enter a valid email address/i));
  });
});

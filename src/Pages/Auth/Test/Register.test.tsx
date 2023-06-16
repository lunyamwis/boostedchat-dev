import React from "react";
import { Register } from "../Register";
import { render, screen, userEvent } from "../../../Utils/test.util";

describe("Register input test", () => {
  it("should return errors when inputs are invalid", async () => {
    render(<Register />);
    const buttonEl = screen.getByText(/register/i);
    const firstNameEl = screen.getByLabelText(/first name/i);
    const lastNameEl = screen.getByLabelText(/last name/i);
    const emailEl = screen.getByLabelText(/email address/i);
    const passwordEl = screen.getAllByLabelText(/password/i)[0];
    const confirmPassEl = screen.getByLabelText(/confirm password/i);

    expect(firstNameEl).toBeInTheDocument();
    expect(lastNameEl).toBeInTheDocument();
    expect(emailEl).toBeInTheDocument();
    expect(buttonEl).toBeInTheDocument();
    expect(passwordEl).toBeInTheDocument();
    expect(confirmPassEl).toBeInTheDocument();

    await userEvent.click(buttonEl);

    expect(screen.getByText(/please fill in your first name/i));

    await userEvent.type(firstNameEl, "First");
    await userEvent.click(buttonEl);
    expect(screen.getByText(/please fill in your last name/i));

    await userEvent.type(lastNameEl, "Last");
    await userEvent.click(buttonEl);
    expect(screen.getByText(/please fill in your email address/i));

    await userEvent.type(emailEl, "an email");
    await userEvent.click(buttonEl);
    expect(screen.getByText(/please enter your account password/i));

    await userEvent.type(passwordEl, "Test12345");
    await userEvent.click(buttonEl);
    expect(screen.getByText(/please confirm your account password/i));

    await userEvent.type(confirmPassEl, "Test1234");
    await userEvent.click(buttonEl);
    expect(screen.getByText(/please enter a valid email address/i));

    await userEvent.clear(emailEl);
    await userEvent.type(emailEl, "user@gmail.com");
    await userEvent.click(buttonEl);
    expect(screen.getByText(/passwords do not match/i));
  });

  //  it("should return success status when login is successful")
});

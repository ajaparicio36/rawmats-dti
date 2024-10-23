// import React from 'react'
// import { render, screen, waitFor } from '@testing-library/react'
// import userEvent from '@testing-library/user-event'
// import LoginForm from '@/components/login/LoginForm'
// import { useForm } from 'react-hook-form'

// // Mock the external dependencies
// jest.mock('react-hook-form', () => ({
//   ...jest.requireActual('react-hook-form'),
//   useForm: jest.fn(),
// }))

// jest.mock('@hookform/resolvers/zod', () => ({
//   zodResolver: jest.fn(),
// }))

// describe('LoginForm', () => {
//   beforeEach(() => {
//     // Reset all mocks before each test
//     jest.clearAllMocks()

//     // Setup default mock implementation for useForm
//     ;(useForm as jest.Mock).mockReturnValue({
//       register: jest.fn(),
//       handleSubmit: jest.fn(callback => (data: any) => callback(data)),
//       formState: { errors: {} },
//     })
//   })

//   // Test for component rendering
//   test('renders login form with all elements', () => {
//     render(<LoginForm />)

//     expect(screen.getByLabelText(/email address/i)).toBeInTheDocument()
//     expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
//     expect(screen.getByRole('button', { name: /^login$/i })).toBeInTheDocument()
//     expect(screen.getByRole('button', { name: /login with google/i })).toBeInTheDocument()
//     expect(screen.getByText(/need an account\?/i)).toBeInTheDocument()
//     expect(screen.getByText(/forgot my password/i)).toBeInTheDocument()
//   })

//   // Test for input validation
//   test('displays error messages for invalid inputs', async () => {
//     const mockErrors = {
//       email: { message: 'Invalid email address' },
//       password: { message: 'Password must be at least 8 characters long' },
//     }

//     ;(useForm as jest.Mock).mockReturnValue({
//       register: jest.fn(),
//       handleSubmit: jest.fn(),
//       formState: { errors: mockErrors },
//     })

//     render(<LoginForm />)

//     await waitFor(() => {
//       expect(screen.getByText(/invalid email address/i)).toBeInTheDocument()
//       expect(screen.getByText(/password must be at least 8 characters long/i)).toBeInTheDocument()
//     })
//   })

//   // Test for form submission
//   test('submits the form with valid data', async () => {
//     const mockOnSubmit = jest.fn();
//     const user = userEvent.setup();

//     const mockHandleSubmit = jest.fn((callback) => (error: any) => {
//       error.preventDefault();
//       callback({ email: 'test@example.com', password: 'password123' });
//     });

//     ;(useForm as jest.Mock).mockReturnValue({
//       register: jest.fn(),
//       handleSubmit: mockHandleSubmit,
//       formState: { errors: {} },
//     });

//     // render(<LoginForm onSubmit={mockOnSubmit} />);

//     // Submit the form
//     await user.click(screen.getByRole('button', { name: /^login$/i }));

//     // Check if the onSubmit function was called with the correct data
//     await waitFor(() => {
//       expect(mockOnSubmit).toHaveBeenCalledWith({
//         email: 'test@example.com',
//         password: 'password123',
//       });
//     });
//   });

//   // Test for Google login button
//   test('handles Google login button click', async () => {
//     const user = userEvent.setup()
//     const mockConsoleLog = jest.fn()
//     console.log = mockConsoleLog

//     render(<LoginForm />)

//     // Click the Google login button
//     await user.click(screen.getByRole('button', { name: /login with google/i }))

//     // Check if the handleGoogleLogin function was called
//     expect(mockConsoleLog).toHaveBeenCalledWith('Login with Google')
//   })
// })

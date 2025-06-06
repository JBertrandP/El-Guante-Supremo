


def user_signup(**kwargs):
    """
    Function to handle user signup.
    :param user: User object containing user details.
    :return: None
    """
    if kwargs.get('full_name') is None or kwargs.get('email') is None or kwargs.get('password') is None:
        raise ValueError("Full name, email, and password are required for signup.")
    

    #Will insert the user into the database (not implemented here)
    # Assuming the user is successfully created in the database
    if (True):
        return True
    else: 
        return False

    print(f"User {kwargs['full_name']} signed up with email {kwargs['email']}.")
    

def user_login(**kwargs):
    """
    Function to handle user login.
    :param user: User object containing user details.
    :return: None
    """
    if kwargs.get('email') is None or kwargs.get('password') is None:
        raise ValueError("Email and password are required for login.")
    
    #compare with the database (not implemented here)
    # Assuming the user exists and credentials are correct

    print(f"User with email {kwargs['email']} logged in.")


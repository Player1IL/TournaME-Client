// src/app/pages/personal/settings/change-password.js
"use client";

const ChangePassword = () => (
    <div>
        <h1>Change Password</h1>
        <form>
            <div>
                <label htmlFor="old-password">Old Password:</label>
                <input type="password" id="old-password" name="old-password" />
            </div>
            <div>
                <label htmlFor="new-password">New Password:</label>
                <input type="password" id="new-password" name="new-password" />
            </div>
            <div>
                <label htmlFor="confirm-password">Confirm Password:</label>
                <input type="password" id="confirm-password" name="confirm-password" />
            </div>
            <button type="submit">Change Password</button>
        </form>
    </div>
);

export default ChangePassword;

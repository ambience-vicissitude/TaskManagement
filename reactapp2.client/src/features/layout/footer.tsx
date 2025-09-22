// Footer component with a link to the Home page
// - designed to simply provide a way to navigate back to the home page from any other page in the app
// - this closes the 'navigable routes' loop, ensuring users can always return to the starting point of the SPA
const FooterComponent = () => {
    return (
        <ul>
            <li>
                {/* Link to Home page to close navigable routes */}
                <a href="/" style={{ fontWeight: "bold" }}>
                    "Go to Home"
                </a>
            </li>
        </ul>
    )
}

export default FooterComponent
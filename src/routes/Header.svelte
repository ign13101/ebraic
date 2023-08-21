<script>
    import {
        Navbar,
        NavbarBrand,
        Nav,
        NavItem,
        NavLink,
        Dropdown,
        DropdownToggle,
        DropdownMenu,
        DropdownItem,
    } from "sveltestrap";
</script>

<header>
    <Navbar color="primary" dark expand="md" container="fluid">
        <NavbarBrand href="/"><b> Ebook to Braille Converter</b></NavbarBrand>

        <Nav navbar>
            <NavItem>
                <NavLink href="/" class="text-white">Home</NavLink>
            </NavItem>
            <NavItem>
                <NavLink href="/converter" class="text-white">Converter</NavLink>
            </NavItem>
            <NavItem>
                <NavLink href="/translator" class="text-white">Translator</NavLink>
            </NavItem>
            <NavItem>
                <NavLink href="/viewer" class="text-white">Viewer</NavLink>
            </NavItem>
            <NavItem>
                <NavLink href="/about" class="text-white">About</NavLink>
              </NavItem>
        </Nav>
    </Navbar>
</header>

<style>
    header {
        width: 100%;
    }
</style>

<script>
    import {
        Navbar,
        NavbarBrand,
        NavbarToggler,
        Nav,
        NavItem,
        NavLink,
        Container,
        Collapse,
    } from "sveltestrap";
    import { onMount } from "svelte";

    // let isOpen = false;
    let screenWidth;
    let phoneView;
    let screenHeight

    onMount(() => {
        screenWidth = window.innerWidth;
        screenHeight = window.innerHeight;
        console.log("height" + screenHeight);

        if (screenWidth < 767) {
            phoneView = true;
        } else {
            phoneView = false;
        }
        window.addEventListener("resize", handleResize);
    });

    function handleResize() {
        screenWidth = window.innerWidth;
        screenHeight = window.innerHeight;
        if (screenWidth < 767) {
            phoneView = true;
        } else {
            phoneView = false;
        }
        console.log(phoneView);
    }

    // function handleUpdate(event) {
    //     isOpen = event.detail.isOpen;
    // }
</script>

{#if phoneView}
    <div
        class="mt-3"
        style="background-color: transparent; position: absolute; width: 100%; z-index: 1;"
    >
        <div
            class="d-flex flex-column justify-content-center align-items-center"
        >
            <a href="/converter" class="link-light mt-1">
                <div class="navig-link" id="brand">EBRAIC</div></a
            >
            <!-- <a href="/converter" class="link-light mt-2"
                ><div class="navig-link">INICIO</div></a
            > -->
            <a href="/converter" class="link-light mt-1"
                ><div class="navig-link">CONVERSOR ARCHIVOS</div></a
            >
            <a href="/converter" class="link-light mt-1"
                ><div class="navig-link">CONVERSOR TEXTO</div>
            </a>
            <a href="/converter" class="link-light mt-1"
                ><div class="navig-link">VISUALIZADOR BRAILLE</div>
            </a>
        </div>
    </div>

    <div class="contextPhone" style="height: ${screenHeight}px;">
        <h1>phoneView</h1>
        <div class="m-5 pt-2">
            Sed ut perspiciatis, unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam eaque ipsa,
            quae ab illo inventore veritatis et quasi architecto 
        </div>
    </div>
{:else}
    <Navbar color="transparent" dark expand="md" ref="bar">
        <NavbarBrand href="/" style="font-weight: bold; margin-right: 0;"
            >EBRAIC</NavbarBrand
        >
        <!-- <NavbarToggler aria-label="Toggle navigation" on:click={() => (isOpen = !isOpen)} /> -->
        <!-- <Collapse {isOpen} navbar expand="md" on:update={handleUpdate}> -->
        <Nav navbar>
            <!-- <NavItem ref="navitem">
                <NavLink
                    href="/converter"
                    class="navbar-link"
                    style="font-weight: bold">INICIO</NavLink
                >
            </NavItem> -->
            <NavItem ref="navitem">
                <NavLink
                    href="/converter"
                    class="navbar-link"
                    style="font-weight: bold">CONVERSOR ARCHIVOS</NavLink
                >
            </NavItem>
            <NavItem ref="navitem">
                <NavLink
                    href="/converter"
                    class="navbar-link"
                    style="font-weight: bold">CONVERSOR TEXTO</NavLink
                >
            </NavItem>
            <NavItem ref="navitem">
                <NavLink
                    href="/converter"
                    class="navbar-link"
                    style="font-weight: bold">VISUALIZADOR BRAILLE</NavLink
                >
            </NavItem>
        </Nav>
        <!-- </Collapse> -->
    </Navbar>
    <div class="context">
        <h1>not phoneView</h1>
        <Container>
            <div class="m-5 pt-3">
                Sed ut perspiciatis, unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam eaque ipsa,
                quae ab illo inventore veritatis et quasi architecto beatae
                vitae dicta sunt, explicabo. Nemo enim ipsam voluptatem, quia
                voluptas sit, aspernatur aut odit aut fugit, sed quia
                consequuntur magni dolores eos, qui ratione voluptatem sequi
                nesciunt, neque porro quisquam est, qui dolorem ipsum, quia
                dolor sit amet consectetur adipisci[ng] velit, sed quia non
                numquam [do] eius modi tempora inci[di]dunt, ut labore et dolore
                magnam aliquam quaerat voluptatem. Ut enim ad minima veniam,
                quis nostrum[d] exercitationem ullam corporis suscipit
                laboriosam, nisi ut aliquid ex ea commodi consequatur?
            </div>
        </Container>
    </div>
{/if}

<!-- <div class="dar my-2" > -->

<!-- </div> -->

<div class="animatedArea align-middle">
    <ul class="circles">
        <li />
        <li />
        <li />
        <li />
        <li />
        <li />
        <li />
        <li />
        <li />
        <li />
    </ul>
</div>

<style>
    /* .header-links a {
        color: black;
        font-weight: bold;
    } */
    /* * {outline: solid 1px red;} */
    /* @media (max-width: 767px) {
        :global([ref="bar"]) {
            width: 100%;
            flex-direction: column !important;
            align-items: center;
            text-align: center;
            position: absolute;
        }
        :global([ref="navitem"]) {
            width: 100%;
            padding: 10px 0;
        }
        :global([ref="nav"]) {
            flex-direction: column !important;
            color: red;
        }
    } */
    /* @media not all and (max-width: 767px) {
        :global([ref="bar"]) {
            width: 100%;
            position: absolute;
            z-index: 1;
        }
        :global([ref="navitem"]) {
        }
    } */
    #brand {
        font-size: 1.5em;
    }
    .navig-link {
        /* font-family: 'Courier New', Courier, monospace; */
        font-weight: bold;
    }
    a {
        text-decoration: none;
    }
    :global([ref="bar"]) {
        width: 100%;
        position: absolute;
        z-index: 1;
    }
    :global([ref="barPhone"]) {
        width: 100%;
        position: absolute;
        /* z-index: 1; */
    }
    .contextPhone {
        width: 100%;
        position: absolute;
        top: 40vh;
        /* height: {screenHeight}; */
    }

    .contextPhone h1 {
        text-align: center;
        color: #fff;
        font-size: 50px;
    }
    .context {
        width: 100%;
        position: absolute;
        top: 20vh;
    }

    .context h1 {
        text-align: center;
        color: #fff;
        font-size: 50px;
    }

    .animatedArea {
        background: #4e54c8;
        background: -webkit-linear-gradient(to left, #8f94fb, #4e54c8);
        width: 100%;
        height: 100vh;
    }

    /* .dark .animatedArea {
        background: linear-gradient(-45deg, #671313, #690b2f, #0a316c, #085b1c);
        background-size: 400% 400%;
    } */

    @keyframes gradient {
        0% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0% 50%;
        }
    }

    .circles {
        position: absolute;
        top: 0;
        right: 0;
        width: 100%;
        height: 100vh;
        overflow: hidden;
    }

    .circles li {
        position: absolute;
        display: block;
        list-style: none;
        width: 20px;
        height: 20px;
        background: rgba(255, 255, 255, 0.2);
        animation: animate 25s linear infinite;
        bottom: -150px;
    }

    .circles li:nth-child(1) {
        left: 25%;
        width: 80px;
        height: 80px;
        animation-delay: 0s;
    }

    .circles li:nth-child(2) {
        left: 10%;
        width: 20px;
        height: 20px;
        animation-delay: 2s;
        animation-duration: 12s;
    }

    .circles li:nth-child(3) {
        left: 70%;
        width: 20px;
        height: 20px;
        animation-delay: 4s;
    }

    .circles li:nth-child(4) {
        left: 40%;
        width: 60px;
        height: 60px;
        animation-delay: 0s;
        animation-duration: 18s;
    }

    .circles li:nth-child(5) {
        left: 65%;
        width: 20px;
        height: 20px;
        animation-delay: 0s;
    }

    .circles li:nth-child(6) {
        left: 75%;
        width: 110px;
        height: 110px;
        animation-delay: 3s;
    }

    .circles li:nth-child(7) {
        left: 35%;
        width: 150px;
        height: 150px;
        animation-delay: 7s;
    }

    .circles li:nth-child(8) {
        left: 50%;
        width: 25px;
        height: 25px;
        animation-delay: 15s;
        animation-duration: 45s;
    }

    .circles li:nth-child(9) {
        left: 20%;
        width: 15px;
        height: 15px;
        animation-delay: 2s;
        animation-duration: 35s;
    }

    .circles li:nth-child(10) {
        left: 85%;
        width: 150px;
        height: 150px;
        animation-delay: 0s;
        animation-duration: 11s;
    }

    @keyframes animate {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
            border-radius: 0;
        }

        100% {
            transform: translateY(-1000px) rotate(720deg);
            opacity: 0;
            border-radius: 50%;
        }
    }
</style>

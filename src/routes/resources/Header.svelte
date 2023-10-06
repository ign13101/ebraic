<script>
    import {
        Row,
        Col,
    } from "sveltestrap";
</script>

<header class="full-width-header">
    <Row class="d-md-flex align-items-center justify-content-between">
        <Col class="col-md-auto mb-2 mb-md-0 ml-md-4 mt-2">
            <a href="/" class="linkBrand"><b> <span class="elevated-text">EBRAI</span>⠯</b></a>
        </Col>
        <Col class="col-md-auto d-flex justify-content-md-end mr-md-4">
            <a href="/" class="link">Inicio</a>
            <a href="/converter" class="link">Conversor</a>
            <a href="/translator" class="link">Traductor</a>
            <a href="/viewer" class="link">Visor</a>
            <a href="/about" class="link">Descubre</a>
        </Col>
    </Row>
</header>

<style>
    /* You can add global or scoped styles here if needed */
    /* * {
        outline: 1px solid red;
    } */

    .link {
        text-transform: uppercase;
        text-decoration: none;
        font-weight: bold;
        font-size: 0.9em;
        color: black;
        
    }

    .linkBrand {
        text-transform: uppercase;
        text-decoration: none;
        font-weight: bold;
        font-size: 2em;
        color: black;
        padding-left: 15px;
    }

    .elevated-text {
        display: inline-block;
        transform: translateY(-0.05em);
    }

    /* Media query for mobile view */
    @media (max-width: 767px) {
        .link {
            padding-left: 10px; 
        }
    }
    @media (min-width: 767px) {
        .link {
            padding: 15px;
        }
    }

    /* .full-width-header {
        width: 100%;
    } */
</style>

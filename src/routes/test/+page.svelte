<script>
    import {
        Row,
        Col,
    } from "sveltestrap";
</script>

<header class="full-width-header">
    <div>
        <Row class="text-center py-3 px-4">
            <Col>
                <a href="/" class="brand-link"><b> EBRAI⠯</b></a>
            </Col>
        </Row>
        <Row class="text-center py-2 px-4">
            <Col class="d-flex justify-content-between">
                <a href="/" class="menu-link">Home</a>
                <a href="/converter" class="menu-link">Converter</a>
                <a href="/translator" class="menu-link">Translator</a>
                <a href="/viewer" class="menu-link">Viewer</a>
                <a href="/about" class="menu-link">About</a>
            </Col>
        </Row>
    </div>
</header>

<style>
    /* You can add global or scoped styles here if needed */
    * {
        outline: 1px solid red;
    }
    
    .full-width-header {
        width: 100%;
    }

    .brand-link {
        font-size: 24px;
        font-weight: bold;
        color: black;
        text-decoration: none;
    }

    .menu-link {
        font-size: 18px;
        font-weight: bold;
        color: black;
        text-decoration: none !important;
    }
</style>

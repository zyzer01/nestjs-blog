'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">nest-tut documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-e07c8b85090159ef337d0455145130c2c8fc7212f5c0aa3cabc196678ffc01ca29dfc10a90181be85d7cd0d565fff8a272f4246fccde246c3abf0b48e8b171dc"' : 'data-bs-target="#xs-controllers-links-module-AppModule-e07c8b85090159ef337d0455145130c2c8fc7212f5c0aa3cabc196678ffc01ca29dfc10a90181be85d7cd0d565fff8a272f4246fccde246c3abf0b48e8b171dc"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-e07c8b85090159ef337d0455145130c2c8fc7212f5c0aa3cabc196678ffc01ca29dfc10a90181be85d7cd0d565fff8a272f4246fccde246c3abf0b48e8b171dc"' :
                                            'id="xs-controllers-links-module-AppModule-e07c8b85090159ef337d0455145130c2c8fc7212f5c0aa3cabc196678ffc01ca29dfc10a90181be85d7cd0d565fff8a272f4246fccde246c3abf0b48e8b171dc"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-e07c8b85090159ef337d0455145130c2c8fc7212f5c0aa3cabc196678ffc01ca29dfc10a90181be85d7cd0d565fff8a272f4246fccde246c3abf0b48e8b171dc"' : 'data-bs-target="#xs-injectables-links-module-AppModule-e07c8b85090159ef337d0455145130c2c8fc7212f5c0aa3cabc196678ffc01ca29dfc10a90181be85d7cd0d565fff8a272f4246fccde246c3abf0b48e8b171dc"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-e07c8b85090159ef337d0455145130c2c8fc7212f5c0aa3cabc196678ffc01ca29dfc10a90181be85d7cd0d565fff8a272f4246fccde246c3abf0b48e8b171dc"' :
                                        'id="xs-injectables-links-module-AppModule-e07c8b85090159ef337d0455145130c2c8fc7212f5c0aa3cabc196678ffc01ca29dfc10a90181be85d7cd0d565fff8a272f4246fccde246c3abf0b48e8b171dc"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-0cd0a29002376e8d3edeba1d4d6eb59280c39e91c5f9777acf3320e430eaf9c36a29fd686a1eb6f6e37fb8925bedb70ef56d10f31bc640bbcb72599931656b56"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-0cd0a29002376e8d3edeba1d4d6eb59280c39e91c5f9777acf3320e430eaf9c36a29fd686a1eb6f6e37fb8925bedb70ef56d10f31bc640bbcb72599931656b56"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-0cd0a29002376e8d3edeba1d4d6eb59280c39e91c5f9777acf3320e430eaf9c36a29fd686a1eb6f6e37fb8925bedb70ef56d10f31bc640bbcb72599931656b56"' :
                                            'id="xs-controllers-links-module-AuthModule-0cd0a29002376e8d3edeba1d4d6eb59280c39e91c5f9777acf3320e430eaf9c36a29fd686a1eb6f6e37fb8925bedb70ef56d10f31bc640bbcb72599931656b56"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-0cd0a29002376e8d3edeba1d4d6eb59280c39e91c5f9777acf3320e430eaf9c36a29fd686a1eb6f6e37fb8925bedb70ef56d10f31bc640bbcb72599931656b56"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-0cd0a29002376e8d3edeba1d4d6eb59280c39e91c5f9777acf3320e430eaf9c36a29fd686a1eb6f6e37fb8925bedb70ef56d10f31bc640bbcb72599931656b56"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-0cd0a29002376e8d3edeba1d4d6eb59280c39e91c5f9777acf3320e430eaf9c36a29fd686a1eb6f6e37fb8925bedb70ef56d10f31bc640bbcb72599931656b56"' :
                                        'id="xs-injectables-links-module-AuthModule-0cd0a29002376e8d3edeba1d4d6eb59280c39e91c5f9777acf3320e430eaf9c36a29fd686a1eb6f6e37fb8925bedb70ef56d10f31bc640bbcb72599931656b56"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PostModule.html" data-type="entity-link" >PostModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-PostModule-3e879f76da384a9966a813be896417061cb53c3c8def07874df14feca13c501b8d53ae333f0c6f80b4d094ea6524f8d2582880a83db2922942fda1f7b29d9cc6"' : 'data-bs-target="#xs-controllers-links-module-PostModule-3e879f76da384a9966a813be896417061cb53c3c8def07874df14feca13c501b8d53ae333f0c6f80b4d094ea6524f8d2582880a83db2922942fda1f7b29d9cc6"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PostModule-3e879f76da384a9966a813be896417061cb53c3c8def07874df14feca13c501b8d53ae333f0c6f80b4d094ea6524f8d2582880a83db2922942fda1f7b29d9cc6"' :
                                            'id="xs-controllers-links-module-PostModule-3e879f76da384a9966a813be896417061cb53c3c8def07874df14feca13c501b8d53ae333f0c6f80b4d094ea6524f8d2582880a83db2922942fda1f7b29d9cc6"' }>
                                            <li class="link">
                                                <a href="controllers/PostController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PostModule-3e879f76da384a9966a813be896417061cb53c3c8def07874df14feca13c501b8d53ae333f0c6f80b4d094ea6524f8d2582880a83db2922942fda1f7b29d9cc6"' : 'data-bs-target="#xs-injectables-links-module-PostModule-3e879f76da384a9966a813be896417061cb53c3c8def07874df14feca13c501b8d53ae333f0c6f80b4d094ea6524f8d2582880a83db2922942fda1f7b29d9cc6"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PostModule-3e879f76da384a9966a813be896417061cb53c3c8def07874df14feca13c501b8d53ae333f0c6f80b4d094ea6524f8d2582880a83db2922942fda1f7b29d9cc6"' :
                                        'id="xs-injectables-links-module-PostModule-3e879f76da384a9966a813be896417061cb53c3c8def07874df14feca13c501b8d53ae333f0c6f80b4d094ea6524f8d2582880a83db2922942fda1f7b29d9cc6"' }>
                                        <li class="link">
                                            <a href="injectables/PostService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserModule.html" data-type="entity-link" >UserModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UserModule-1a4395f232a25fc4fe4ae8c36ff24664fd6631ce509c546c17fa99e57b7669da7c2442dff817bf6162668e62cbcfda2f9fe021671d86cd1ef4b3be88d2dce142"' : 'data-bs-target="#xs-controllers-links-module-UserModule-1a4395f232a25fc4fe4ae8c36ff24664fd6631ce509c546c17fa99e57b7669da7c2442dff817bf6162668e62cbcfda2f9fe021671d86cd1ef4b3be88d2dce142"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UserModule-1a4395f232a25fc4fe4ae8c36ff24664fd6631ce509c546c17fa99e57b7669da7c2442dff817bf6162668e62cbcfda2f9fe021671d86cd1ef4b3be88d2dce142"' :
                                            'id="xs-controllers-links-module-UserModule-1a4395f232a25fc4fe4ae8c36ff24664fd6631ce509c546c17fa99e57b7669da7c2442dff817bf6162668e62cbcfda2f9fe021671d86cd1ef4b3be88d2dce142"' }>
                                            <li class="link">
                                                <a href="controllers/UserController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UserModule-1a4395f232a25fc4fe4ae8c36ff24664fd6631ce509c546c17fa99e57b7669da7c2442dff817bf6162668e62cbcfda2f9fe021671d86cd1ef4b3be88d2dce142"' : 'data-bs-target="#xs-injectables-links-module-UserModule-1a4395f232a25fc4fe4ae8c36ff24664fd6631ce509c546c17fa99e57b7669da7c2442dff817bf6162668e62cbcfda2f9fe021671d86cd1ef4b3be88d2dce142"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UserModule-1a4395f232a25fc4fe4ae8c36ff24664fd6631ce509c546c17fa99e57b7669da7c2442dff817bf6162668e62cbcfda2f9fe021671d86cd1ef4b3be88d2dce142"' :
                                        'id="xs-injectables-links-module-UserModule-1a4395f232a25fc4fe4ae8c36ff24664fd6631ce509c546c17fa99e57b7669da7c2442dff817bf6162668e62cbcfda2f9fe021671d86cd1ef4b3be88d2dce142"' }>
                                        <li class="link">
                                            <a href="injectables/UserService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/CreatePostDto.html" data-type="entity-link" >CreatePostDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePostMetaOptionDto.html" data-type="entity-link" >CreatePostMetaOptionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetUserParamsDto.html" data-type="entity-link" >GetUserParamsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PatchUserDto.html" data-type="entity-link" >PatchUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Post.html" data-type="entity-link" >Post</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdatePostDto.html" data-type="entity-link" >UpdatePostDto</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});
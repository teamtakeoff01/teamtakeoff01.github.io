(function ($, window, document, undefined) {
    var similardeals = function (elm, options) {
        this.elm = elm[0];
        this.$elm = elm;
        this.from = 0;
        this.hovered = false;
        this.options = $.extend({}, $.fn.similardeals.options, options);
        this.createHtml();
        this.setHandlers();
        this.setUI();
        this.resetTimer();
        this.notActive = false;
    }

    similardeals.prototype.createHtml = function () {
        var wrapper = this.$elm,
			div = $('<div>'),
			data = [];
        this.elements = {};
        wrapper.addClass('similar-deals-wrapper').addClass(this.getBrowserClass());

        if (this.options.testData) {
            data = $.fn.similardeals.testData(15).FoundOffers.OfferList;
        } else if (this.options.data) {
            data = this.options.data.FoundOffers.OfferList
        }
        var subWrapper = div.clone().addClass('similar-deals-sub-wrapper');
        var leftBlock = div.clone().addClass('similar-deals-left-block');
        this.elements.left = div.clone().addClass('similar-deals-control-left').appendTo($('<div>', { class: 'similar-deals-control-left-wrapper' }).appendTo(subWrapper));
        // leftBlock.appendTo(wrapper);

        this.elements.listHolder = div.clone().addClass('similar-deals-list-holder').appendTo(subWrapper);
        this.elements.list = div.clone().addClass('similar-deals-list').hide().appendTo(this.elements.listHolder);
        var rightBlock = div.clone().addClass('similar-deals-right-block');
        var rightBlockSmall = div.clone().addClass('block-right');
        this.elements.close = $('<div>', { class: 'similar-deals-close fl-r', text: '' }).appendTo($('<div>').appendTo(rightBlockSmall));
        this.elements.settings = $('<div>', { class: 'similar-deals-settings fl-r', text: '' }).appendTo($('<div>').appendTo(rightBlockSmall));
        legalWrapper = $('<div>', { class: 'legal-wrapper' });
        this.elements.legal = $('<a>', { class: 'similar-deals-legal', text: 'Legal', href: '', target: '_blank' }).appendTo(legalWrapper);
        this.elements.partner = $('<a>', { class: 'similar-deals-partner', text: 'Brought by Partner', target: '_blank' }).appendTo(legalWrapper);
        legalWrapper.appendTo(rightBlockSmall);
        rightBlockSmall.appendTo(rightBlock);
        this.elements.right = div.clone().addClass('similar-deals-control-right').appendTo($('<div>', { class: 'similar-deals-control-right-wrapper' }).appendTo(subWrapper));
        rightBlock.appendTo(wrapper);
        subWrapper.appendTo(wrapper);
        this.prodCount = 0;
        if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                this.addProd(data[i])
            };
            this.recountList();
        }
        $('body').prepend(wrapper);
        this.loadImages();
    }

    similardeals.prototype.setHandlers = function () {
        var self = this;
        window.similarSelf = self;
        self.elements.right.on('click', function () {
            if (self.notActive) { return false; }
            if (self.from == self.prodCount - self.elmPerTime) {
                var css = { 'width': (self.prodCount + 1) * self.options.productWidth + 'px' }
                self.elements.list.css(css).append(self.elements.list.children().first().clone());
                self.prodCount++;
                self.move(1, function () {
                    self.prodCount--;
                    var css = {
                        'width': self.prodCount * self.options.productWidth + 'px',
                        'margin-left': -1 * (self.from - 1) * self.options.productWidth + 'px'
                    }
                    self.elements.list.css(css).children().first().remove()
                    self.from--;
                })
            } else {
                self.move(1);
            }
            self.slideDirection = 1;
            self.resetTimer();
        })
        self.elements.left.on('click', function () {
            if (self.notActive) { return false; }
            if (self.from == 0) {
                var css = { 'margin-left': -1 * (self.from + 1) * self.options.productWidth + 'px' };
                self.elements.list.css(css).prepend(self.elements.list.children().last().clone());
                self.move(-1, function () {
                    self.elements.list.children().last().remove();
                })
            } else {
                self.move(-1);
            }

            self.slideDirection = -1;
            self.resetTimer();
        })
        self.elements.close.on('click', function () {
            var func = self.onClose || function () { }
            func();
        })
        self.elements.settings.on('click', function () {
            var func = self.onSettings || function () { }
            func();
        })
        self.elements.listHolder.on('mouseenter', function () {
            self.elements.list.children().children().removeClass('active')
            self.hovered = true;
        }).on('mouseleave', function () {
            self.hovered = false;
            var active = Math.floor((self.elmPerTime + 1) / 2) + self.from - 1;
            self.elements.list.children().eq(active).children().addClass('active')
        })
        $(window).on('resize', function () {
            self.recountList();
            self.loadImages();
        })
    }

    similardeals.prototype.getBrowserClass = function () {
        var agent = (window.navigator.userAgent || window.navigator.vendor || window.opera),
			browsers = {
			    chrome: { reg: /Chrome/, class: 'similar-deals-chrome' },
			    firefox: { reg: /Firefox/, class: 'similar-deals-firefox' },
			    'ie-9': { reg: /MSIE 9/, class: 'similar-deals-ie-9' },
			    ie: { reg: /(MSIE 10|Trident.*rv:11)/, class: 'similar-deals-ie-10' },
			    safari: { reg: /Safari/, class: 'similar-deals-safari' },
			};
        for (browser in browsers) {
            var res = browsers[browser].reg.test(agent);
            if (res) {
                return browsers[browser].class;
            }
        }
        return browsers.chrome.class;

    }

    similardeals.prototype.addProd = function (data) {
        var noPhoto = function () {
            $(this)
			.prop('src', '../../similardeals/img/no-photo.png')
			.off('error', noPhoto)
        }
        var prod = $('<div>')
			.addClass('similar-deals-product-wrapper')
			.append(
				$('<a>', { class: 'similar-deals-product', href: data.product_url, target: '_blank' })
				.append(
					$('<div>', {
					    class: 'similar-deals-img-wrapper'
					}).append(
						$('<div>').append(
							$('<img>', {
							    'data-src': data.product_image ? data.product_image : '../../similardeals/img/no-photo.png',
							    class: 'similar-deals-img'
							}).on('error', noPhoto)
						)
					),
					$('<div>', {
					    class: 'similar-deals-details'
					}).append(
						$('<h4>', {
						    class: 'similar-deals-price',
						    text: data.product_price_display
						}),
						$('<span>', {
						    class: 'similar-deals-title',
						    text: data.product_name
						}),
						$('<div>', {
						    class: 'similar-deals-merchant-wrapper'
						}).append(function(){
						    if (data.merchant_image) {
						        return $('<img>', {
						            class: 'similar-deals-merchant',
						            src: data.merchant_image,
						        }).on('error', function () {
						            $(this).replaceWith(
                                        $('<div>', {
                                            class: 'similar-deals-buy gray',
                                            text: 'buy now'
                                        })
                                    )
						        });
						    } else {
						        return $('<div>', {
						            class: 'similar-deals-buy gray',
						            text: 'buy now'
						        });
						    }},
							$('<div>', {
							    class: 'similar-deals-buy',
							    text: 'buy now'
							})
						)
					)
				)
			).css({ width: this.options.productWidth })
        prod.appendTo(this.elements.list);
        this.prodCount++;
    }

    similardeals.prototype.recountList = function () {
        var maxElem = parseInt((window.innerWidth - 220) / this.options.productWidth);
        if (this.prodCount < maxElem) {
            this.elmPerTime = this.prodCount;
        } else {
            this.elmPerTime = maxElem;
        }
        this.elements.listHolder.css({ 'width': this.elmPerTime * this.options.productWidth + 'px' })
        this.elements.list.css({ 'width': this.prodCount * this.options.productWidth + 'px' }).show();
        this.elements.list.children().children().removeClass('active')
        var active = Math.floor((this.elmPerTime + 1) / 2) + this.from - 1;
        this.elements.list.children().eq(active).children().addClass('active')
        if (this.prodCount >= this.elmPerTime && this.from > this.prodCount - this.elmPerTime) {
            this.move(this.from - (this.prodCount - this.elmPerTime))
        }

    }
    similardeals.prototype.move = function (offset, cb) {
        this.notActive = true;
        cb = cb || function () { };
        var max = this.prodCount - this.elmPerTime;
        this.from += offset;
        if (this.from >= max) {
            this.from = max;
            this.slideDirection = -1;
        }
        if (this.from <= 0) {
            this.from = 0;
            this.slideDirection = 1;
        }
        console.log(max, this.from)
        var css = { 'margin-left': -1 * this.from * this.options.productWidth + 'px' };
        var self = this;
        this.elements.list.animate(css, {
            complete: function () {
                self.notActive = false;
                cb();
            }
        })
        this.elements.list.children().children().removeClass('active')
        var active = Math.floor((this.elmPerTime + 1) / 2) + this.from - 1;
        this.elements.list.children().eq(active).children().addClass('active')
        this.loadImages();

    }

    similardeals.prototype.resetTimer = function () {
        var self = this
        self.tick = 0;
        if (self.slideDirection == void 0) {
            self.slideDirection = 1;
        }
        clearInterval(self.ticker);
        self.ticker = setInterval(function () {
            self.Tick();
        }, 1);
    }
    similardeals.prototype.Tick = function () {
        if (this.hovered) { return }
        this.tick += 5; // TODO: разобраться с х5
        if (this.tick == this.options.slideTimeout) {
            this.move(this.slideDirection);
            this.tick = 0;
        }
    }


    similardeals.prototype.setUI = function () {
        var self = this;
        self.ui = {
            addOffers: function (offers) {
                for (var i = 0; i < offers.FoundOffers.OfferList.length; i++) {
                    self.addProd(offers.FoundOffers.OfferList[i])
                };
                self.recountList();
                self.loadImages();
            },
            addPartnerInfo: function (partnerData) {
                self.elements.partner.text(partnerData.text)
                if (partnerData.link != void 0) {
                    self.elements.partner.prop('href', partnerData.link)
                } else {
                    self.elements.partner.removeAttr('href');
                }
            },
            addInfoLink: function (infoData) {
                self.elements.legal.text(infoData.text)
                self.elements.legal.prop('href', infoData.link);
            },
            onClose: function (cb) {
                if (typeof cb == 'function') {
                    self.onClose = cb;
                }
            },
            displaySettings: function (cb) {
                if (typeof cb == 'function') {
                    self.onSettings = cb;
                }
            }

        }
    }

    similardeals.prototype.loadImages = function () {
        var self = this;
        for (var i = 0; i < self.elmPerTime + 1; i++) {
            var img = $('.similar-deals-img', self.elements.list.children().eq(self.from + i));
            if (!img) { continue };
            if (!img.prop('src')) {
                img.prop('src', img.data('src'));
            }
        };
        var img = $('.similar-deals-img', self.elements.list.children().last())
        if (!img.prop('src')) {
            img.prop('src', img.data('src'));
        }
    }


    $.fn.similardeals = function (options) {

        var similardealEntity = new similardeals(this, options);
        return similardealEntity;
    }

    $.fn.similardeals.options = {
        data: null,
        testData: false,
        productWidth: 254,
        slideTimeout: 5000
    }

    $.fn.similardeals.testData = function (count) {
        count = count || 5;
        var offers = {
            "requestId": "54d38d89e4b050b04db26558",
            "requestPriceDisplay": "349,99 €",
            "foundOffersCount": 3,
            "FoundOffers": {
                "amount": 3,
                "OfferList": [
                ]
            }
        }
        for (var i = 0; i < count; i++) {
            var price = Math.round(100 + Math.random() * 300 * 100) / 100;
            offers.FoundOffers.OfferList.push(
				{
				    "related": 0,
				    "product_name": "Samsung Galaxy S III (Weiß)",
				    "merchant_name": "Boomstore",
				    "merchant_country": "DE",
				    "merchant_image": "http://library.corporate-ir.net/library/17/176/176060/mediaitems/93/a.com_logo_RGB.jpgasd",
				    "product_image": "http://i2.rozetka.ua/goasdods/277028/record_277028537.jpg",
				    "product_currency": "EUR",
				    "product_price": price,
				    "product_price_display": price + " €",
				    "product_shipping_costs": 4.96,
				    "product_shipping_costs_display": "4,96 €",
				    "product_savings_total": 86.03,
				    "product_savings_total_display": "86,03 €",
				    "product_savings_percentage": 24.6,
				    "product_url": "http://example.com/v2/offerView/54d38d8ae4b050b04db2656e/51aee388e4b0bb20f82a3a4e",
				    "best_offer": true,
				    "product_rating": 3
				}
			)
        };
        return offers;
    }

})(jQuery, window, document);

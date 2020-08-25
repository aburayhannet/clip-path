$.typeahead({
    input: '.js-typeahead-tld_v2',
    minLength: 1,
    maxItem: false,
	group: true,
    order: "asc",
	emptyTemplate: 'No result for "{{query}}"',
	dropdownFilter: "Search All",
    source: {
        "CSS Properties": {
			href: "https://www.cssportal.com/css-properties/{{display}}.php",
            ajax: {
                url: "https://www.cssportal.com/includes/cssproperty.json"
            }
        },
        "HTML Tags": {
			href: "https://www.cssportal.com/html-tags/tag-{{display}}.php",
            ajax: {
                url: "https://www.cssportal.com/includes/tags.json"
            }
        },
        "CSS Functions": {
			href: "https://www.cssportal.com/css-functions/{{display}}.php",
			template: "{{display}}()",
            ajax: {
                url: "https://www.cssportal.com/includes/functions.json"
            }
        },
        "CSS At-Rules": {
			href: "https://www.cssportal.com/css-at-rules/{{display}}.php",
			template: "@{{display}}",
            ajax: {
                url: "https://www.cssportal.com/includes/atrule.json"
            }
        },
        "CSS Pseudo Class": {
			href: "https://www.cssportal.com/css-pseudo-class/{{display}}.php",
            ajax: {
                url: "https://www.cssportal.com/includes/pseudo.json"
            }
        },
        "CSS Data Types": {
			href: "https://www.cssportal.com/css-data-types/{{display}}.php",
			template: "&lt;{{display}}&gt;",
            ajax: {
                url: "https://www.cssportal.com/includes/types.json"
            }
        }
    },
    callback: {
        onNavigateAfter: function (node, lis, a, item, query, event) {
            if (~[38,40].indexOf(event.keyCode)) {
                var resultList = node.closest("form").find("ul.typeahead__list"),
                    activeLi = lis.filter("li.active"),
                    offsetTop = activeLi[0] && activeLi[0].offsetTop - (resultList.height() / 2) || 0;
 
                resultList.scrollTop(offsetTop);
            }
 
        },
        //onResult: function (node, query, result, resultCount) {
       //     if (query === "") return;
 
       //     var text = "";
       //     if (result.length > 0 && result.length < resultCount) {
        //        text = "Showing <strong>" + result.length + "</strong> of <strong>" + resultCount + '</strong> elements matching "' + query + '"';
        //    } else if (result.length > 0) {
        //        text = 'Showing <strong>' + result.length + '</strong> elements matching "' + query + '"';
        //    } else {
        //        text = 'No results matching "' + query + '"';
        //    }
        //    $('#result-container').html(text);
 
        //},
        onSubmit: function (node, form, item, event) {
			var href;
            event.preventDefault();
			if (this.query.length) {
				href = $(".js-typeahead-tld_v2").val();
            }
			$(location).attr('href', href)
        }
    }
});
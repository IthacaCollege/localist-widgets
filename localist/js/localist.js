jQuery('document').ready(function(e){

	jQuery('a#config-localist-fields').click(function(e){
		var txt=jQuery('input[name="url"]').val();
		if(txt==''){
			jQuery('div#widget-data').css('display', 'none');
			jQuery('div#wrong-url').html('<div id="console" class="clearfix"><div class="messages error"><h2 class="element-invisible">Error message</h2>Please entered the URL.</div></div>');
			jQuery('input[name="url"]').addClass('error');
		}		
		else if(is_valid_url(txt)!=1){
			jQuery('div#widget-data').css('display', 'none');
			jQuery('div#wrong-url').html('<div id="console" class="clearfix"><div class="messages error"><h2 class="element-invisible">Error message</h2>You have entered the Wrong URL.</div></div>');
			jQuery('input[name="url"]').addClass('error');
		}else{

			jQuery.ajax({
				url: Drupal.settings.basePath+'save/lurl',
				method: 'GET',
				data: 'lurl='+txt,
				success: function(response){
					//alert(response);
					if(response==0){
						jQuery('div#wrong-url').html('<div id="console" class="clearfix"><div class="messages error"><h2 class="element-invisible">Error message</h2>Please enter valid Localist URL.</div></div>');
						jQuery('div#widget-data').css('display', 'none');
					}else{
						location.reload();						
						jQuery('div#wrong-url').html('');
						jQuery('input[name="url"]').removeClass('error');
						//jQuery('div#widget-data').css('display', 'block');
					}
				}
			});		
			}
		
	});
	jQuery('input#edit-save-widget').on("click", function(e){
		var txt2=jQuery('input[name="url"]').val();
		if(is_valid_url(txt2)!=1){
			jQuery('div#wrong-url').html('<div id="console" class="clearfix"><div class="messages error"><h2 class="element-invisible">Error message</h2>You have entered the Wrong URL.</div></div>');
			jQuery('input[name="url"]').addClass('error');
			e.preventDefault();
		}else{
			jQuery('div#wrong-url').html('');
			jQuery('input[name="url"]').removeClass('error');

			var txt=jQuery('input[name="url"]').val();
			urlgenration(txt);		
			jQuery('#embed').css('display', 'none');
			jQuery('.embed').css('display', 'none');
			jQuery('form#edit-save-widget').submit();
			
		}
	});

	//
	
	jQuery('a#generation_code').click(function(e){
	
		var txt=jQuery('input[name="url"]').val();
		urlgenration(txt);
	//	e.preventDefault();
	});
	jQuery('.form-item-h-desc input[name="h_desc"]').change(function() {
		if(jQuery(this).is(':checked')) {
			hideshowcheckbox();
		}
	});
	
});

jQuery(window).load(function(e){
	var st=jQuery('form').attr('status');
	if(st=="edit" || st=="new"){
		
		jQuery('div#widget-data').css('display', 'block');
		jQuery('.wrape_container select').each(function(e){
			jQuery(this).find('optgroup').removeAttr('label');
		});
		if(jQuery('.form-item-h-desc input[name="h_desc"]').is(':checked')){
			jQuery('input[name="t_desc"],input[name="r_desc"]').removeAttr('checked');
		}
	}	
		
			/* jQuery('form select').each(function(e){
				var value=jQuery(this).attr('sv');
				jQuery(this).find('option').each(function(e){
                  var opt=jQuery(this).val();
                    if(opt == value){
                        jQuery(this).prop('selected','selected');
                    }
				});
			}); */
	if(st=="edit"){
			jQuery('.filters_block input[ftype="filters"]').each(function(e){
				var input= jQuery(this);
				if(input.val()!= ''){
					var val=input.val();
					var name=input.attr('fname');
					jQuery('.all_filters select[fname="'+name+'"] option').each(function(e){
						var opt=jQuery(this).val();
						if(val == opt){
							jQuery(this).prop('selected','selected');
							jQuery(this).attr('selected','selected');
						}
					});
				}
			});
			jQuery('.filters_block input[ftype="exclude_filters"]').each(function(e){
				var input= jQuery(this);
				if(input.val()!= ''){
					var val=input.val();
					var name=input.attr('fname');
					jQuery('.all_exclude_filters select[fname="'+name+'"] option').each(function(e){
						var opt=jQuery(this).val();
						if(opt == val){
							jQuery(this).prop('selected','selected');
							jQuery(this).attr('selected','selected');
						}
					});
				}
			});
	}
	hideshowcheckbox();
});

function is_valid_url(url) {
    return /^(http(s)?:\/\/)?(www\.)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/.test(url);
}
function urlgenration(txt){
	
		if(is_valid_url(txt) && txt != ''){
				var type=[];
				var exclude_type=[];
				var groups=[];
				var places=[];
				var mainurl=txt+'/widget/';
			//select list filters..
				var temp=jQuery('select[name="template"] option:selected').val();
				var community=jQuery('select[name="community"] option:selected').val();
				var match=jQuery('select[name="match"] option:selected').val();
				//var style=jQuery('select[name="style"] option:selected').val();
				var widget_type=jQuery('select[name="widget_type"] option:selected').val();
				jQuery('select[ftype="groups"] option:selected').each(function(e){
					groups.push(jQuery(this).val());
				});
				var all_groups=groups.join('%2C');
				jQuery('select[ftype="places"] option:selected').each(function(e){
					places.push(jQuery(this).val());
				});
				var all_places=places.join('%2C');
			//input text type filters..
				var results=jQuery('input[name="results"]').val();
				var day=jQuery('input[name="day"]').val();

				var keywords=jQuery('input[name="keywords"]').val();				
			//input checkbox type filters..
				var feature=jQuery('input[name="feature"]');
				var sponsored=jQuery('input[name="sponsored"]');
				var instances=jQuery('input[name="instances"]');
				var past_event=jQuery('input[name="past_event"]');				
				var hide_desc=jQuery('input[name="hide_desc"]');				
				var trunca_desc=jQuery('input[name="trunca_desc"]');				
				var render_html=jQuery('input[name="render_html"]');				
				var hide_image=jQuery('input[name="hide_image"]');				
				var hide_time=jQuery('input[name="hide_time"]');				
				var open_links=jQuery('input[name="open_links"]');	
			
				var wtype = jQuery('select[name="wtype"] option:selected').val();
				var wstyle = jQuery('select[name="wstyle"] option:selected').val();
					
				var t_desc = jQuery('input[name="t_desc"]');
				var r_desc = jQuery('input[name="r_desc"]');
				var olnw = jQuery('input[name="olnw"]');
				var h_et = jQuery('input[name="h_et"]');
				var h_img = jQuery('input[name="h_img"]');
				var h_desc = jQuery('input[name="h_desc"]');
				var h_fd = jQuery('input[name="h_fd"]');
				var org_name=jQuery('input[name="organization_name"]').val();
			jQuery('.all_filters select').each(function(e){
					var val=jQuery(this).find('option:selected').each(function(e){
							if(val !=''){
							type.push(jQuery(this).val());
							}
					});
					
				});
				//alert('F '+type);
				var types=type.join('%2C');
				
				jQuery('.all_exclude_filters select').each(function(e){
					var val=jQuery(this).find('option:selected').each(function(e){
							if(val !=''){
							exclude_type.push(jQuery(this).val());
							}
					});
				});
				
				var exclude_types=exclude_type.join('%2C');

				
			//condition here....
				if(wtype && wtype!=''){
					mainurl+=wtype+'?';
				}
				if(org_name && org_name != ''){
					mainurl+='schools='+org_name;
				}
				if(temp && temp != ''){
					//mainurl+='template='+temp;
				}
				
				if(community && community != '' && community != 0){
					mainurl+='campuses='+community;
				}
				if(all_groups && all_groups != ''){
					mainurl+='&groups='+all_groups;
				}
				if(all_places && all_places != ''){
					mainurl+='&venues='+all_places;
				}
				if(types && types != ''){
					mainurl+='&types='+types;
				}
				
				if(match && match != ''){
					mainurl+='&match='+match;
				}
								
				if(exclude_types && exclude_types != ''){
					mainurl+='&exclude_types='+exclude_types;
				}
				
				if(results && results != ''){
					mainurl+='&num='+results;
				}
				if(day && day != ''){
					mainurl+='&days='+day;
				}
				if(keywords && keywords != ''){
					mainurl+='&tags='+keywords;
				}
				if(feature.is(":checked")){
					mainurl+='&picks=1';
				}
				if(sponsored.is(":checked")){
					mainurl+='&sponsored=1';
				}
				if(instances.is(":checked")){
					mainurl+='&all_instances=1';
				}
				if(past_event.is(":checked")){
					mainurl+='&hide_past=1';
				}
				if(hide_desc.is(":checked")){
					mainurl+='&hidedesc=1';
				}
				if(trunca_desc.is(":checked")){
					mainurl+='&expand_descriptions=1';
				}
				if(render_html.is(":checked")){
					mainurl+='&html_descriptions=1';
				}
				if(hide_image.is(":checked")){
					mainurl+='&hideimage=1';
				}
				if(hide_time.is(":checked")){
					mainurl+='&show_times=0';
				}
				if(open_links.is(":checked")){
					mainurl+='&target_blank=1';
				}
				

				if(wstyle && wstyle == 'none'){
				   mainurl+='&style='+wstyle;
				  }else if(wstyle && wstyle != 'none' && wstyle!= ''){
				   mainurl+='&template='+wstyle;
				  }

				if(t_desc.is(":checked")){
					mainurl+='&expand_descriptions=1';
				}

				if(r_desc.is(":checked")){
					mainurl+='&html_descriptions=1';
				}
				if(olnw.is(":checked")){
					mainurl+='&target_blank=1';
				}

				if(h_et.is(":checked")){
					mainurl+='&show_times=0';
				}

				if(h_img.is(":checked")){
					mainurl+='&hideimage=1';
				}
				if(h_desc.is(":checked")){
					mainurl+='&hidedesc=1';
				}
				if(h_fd.is(":checked")){
					mainurl+='&show_types=0';
				}
				var scriptags = '<script type="text/javascript" src="'+mainurl+'"></script><div id="lclst_widget_footer"><a rel="nofollow" style="margin-left:auto;margin-right:auto;display:block;width:81px;margin-top:10px;" title="Widget powered by Localist Online Calendar Software" href="http://www.localist.com?utm_source=widget&utm_campaign=widget_footer&utm_medium=branded%20link"><img src="//d3e1o4bcbhmj8g.cloudfront.net/assets/platforms/default/about/widget_footer.png" alt="Localist Online Calendar Software" style="vertical-align: middle;" width="81" height="23"></a></div>';
		//if(is_valid_url(lurl) && lurl != ''){
			jQuery('.embed').css('display','block');
				jQuery('#embed').val(' ');
				jQuery('#embed').val(scriptags);

				jQuery('div#wrong-url').html('');
				jQuery('input[name="url"]').removeClass('error');

			
		}else{
			jQuery('div#wrong-url').html('<div id="console" class="clearfix"><div class="messages error"><h2 class="element-invisible">Error message</h2>You have entered the Wrong URL.</div></div>');
			jQuery('input[name="url"]').addClass('error');
		}
}
function hideshowcheckbox(){
	if(jQuery('.form-item-h-desc input[name="h_desc"]').is(':checked')){
			jQuery('input[name="t_desc"],input[name="r_desc"]').removeAttr('checked');
		}
}
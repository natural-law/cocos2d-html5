/****************************************************************************
 Copyright (c) 2011-2012 cocos2d-x.org
 Copyright (c) 2013-2014 Chukong Technologies Inc.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

/**
 * The ccui.TextField's properties reader for GUIReader.
 * @class
 * @name ccs.TextFieldReader
 **/
ccs.TextFieldReader = /** @lends ccs.TextFieldReader# */{
    /**
     * Gets the ccs.TextFieldReader.
     * @deprecated since v3.0, please use ccs.TextFieldReader directly.
     * @returns {ccs.TextFieldReader}
     */
    getInstance: function(){
        return ccs.TextFieldReader;
    },

    /**
     * Sets ccui.TextField's properties from json dictionary.
     * @param {ccui.TextField} widget
     * @param {Object} options
     */
    setPropsFromJsonDictionary: function(widget, options){
        ccs.WidgetReader.setPropsFromJsonDictionary.call(this, widget, options);

        var textField = widget;
        var ph = options["placeHolder"];
        if(ph)
            textField.setPlaceHolder(ph);
        textField.setString(options["text"] || "Text Field");
        var fs = options["fontSize1"];
        if(fs)
            textField.setFontSize(fs);
        var fn = options["fontName"];
        if(fn)
            textField.setFontName(fn);
        var tsw = options["touchSizeWidth"];
        var tsh = options["touchSizeHeight"];
        if(tsw && tsh)
            textField.setTouchSize(tsw, tsh);

        var dw = options["width"];
        var dh = options["height"];
        if(dw > 0 || dh > 0){
            //textField.setSize(cc.size(dw, dh));
        }
        var maxLengthEnable = options["maxLengthEnable"];
        textField.setMaxLengthEnabled(maxLengthEnable);

        if(maxLengthEnable){
            var maxLength = options["maxLength"];
            textField.setMaxLength(maxLength);
        }
        var passwordEnable = options["passwordEnable"];
        textField.setPasswordEnabled(passwordEnable);
        if(passwordEnable)
            textField.setPasswordStyleText(options["passwordStyleText"]);

        var aw = options["areaWidth"];
        var ah = options["areaHeight"];
        if(aw && ah){
            var size = cc.size(aw, ah);
            textField.setTextAreaSize(size);
        }
        var ha = options["hAlignment"];
        if(ha)
            textField.setTextHorizontalAlignment(ha);
        var va = options["vAlignment"];
        if(va)
            textField.setTextVerticalAlignment(va);

        ccs.WidgetReader.setColorPropsFromJsonDictionary.call(this, widget, options);
    },

    setPropsFromProtocolBuffers: function(widget, nodeTree){
        var textField = widget;
        var options = nodeTree.textfieldOptions;

        var protocolBuffersPath = ccs.uiReader.getFilePath();

		var IsCustomSize = options.isCustomSize;
		widget.ignoreContentAdaptWithSize(!IsCustomSize);

        if (IsCustomSize)
        {
            var widgetOptions = nodeTree.widgetOptions;
            textField.setContentSize(cc.size(widgetOptions.width, widgetOptions.height));
        }

        ccs.WidgetReader.setPropsFromProtocolBuffers.call(this, widget, nodeTree);
        ccs.WidgetReader.setAnchorPointForWidget.call(this, widget, nodeTree);

        textField.setUnifySizeEnabled(false);

        var ph = options.placeholder;
        if (ph!==null)
        {
            var placeholder = options.placeholder!==null ? options.placeholder : "inputs words here";
            textField.setPlaceHolder(placeholder);
        }
        var text = options.text!==null ? options.text : "Text Field";
        textField.setText(text);

        var fontSize = options.fontSize ? options.fontSize : 20;
        textField.setFontSize(fontSize);


        var fontName = options.fontName!==null ? options.fontName : "微软雅黑";
        textField.setFontName(fontName);

        //        var tsw = options.has_touchsizewidth();
        //        var tsh = options.has_touchsizeheight();
        //        if (tsw && tsh)
        //        {
        //            textField.setTouchSize(Size(options.touchsizewidth(), options.touchsizeheight()));
        //        }

        //        var dw = DICTOOL.getFloatValue_json(options, "width");
        //        var dh = DICTOOL.getFloatValue_json(options, "height");
        //        if (dw > 0.0f || dh > 0.0f)
        //        {
        //            //textField.setSize(Size(dw, dh));
        //        }
        var maxLengthEnable = options.maxlengthEnable;
        textField.setMaxLengthEnabled(maxLengthEnable);

        if (maxLengthEnable)
        {
            var maxLength = options.maxLength!==null ? options.maxLength : 10;
            textField.setMaxLength(maxLength);
        }
        var passwordEnable = options.passwordEnable;
        textField.setPasswordEnabled(passwordEnable);
        if (passwordEnable)
        {
            var passwordStyleText = options.passwordStyleText!==null ? options.passwordStyleText : "*";
            textField.setPasswordStyleText(passwordStyleText);
        }

		if (options.fontResource!==null)
		{
			var resourceData = options.fontresource;
		    textField.setFontName(protocolBuffersPath + resourceData.path());
		}

        // other commonly protperties
        ccs.WidgetReader.setColorPropsFromProtocolBuffers.call(this, widget, nodeTree);
    },

    setPropsFromXML: function(widget, objectData){
        ccs.WidgetReader.prototype.setPropsFromXML.call(this, widget, objectData);

        var textField = widget;

        var xmlPath = ccs.uiReader.getFilePath();

        var isCustomSize = false;
        var width = 0, height = 0;

        var opacity = 255;

        textField.setUnifySizeEnabled(false);

        textField.setFontName("微软雅黑");

        // attributes
        var attribute = objectData.FirstAttribute();
        while (attribute)
        {
            var name = attribute.Name();
            var value = attribute.Value();

            if (name == "PlaceHolderText")
            {
                textField.setPlaceHolder(value);
            }
            else if (name == "LabelText")
            {
                textField.setText(value);
            }
            else if (name == "FontSize")
            {
                textField.setFontSize(atoi(value.c_str()));
            }
            else if (name == "FontName")
            {
                textField.setFontName(value);
            }
            else if (name == "MaxLengthEnable")
            {
                textField.setMaxLengthEnabled((value == "True") ? true : false);
            }
            else if (name == "MaxLengthText")
            {
                textField.setMaxLength(atoi(value.c_str()));
            }
            else if (name == "PasswordEnable")
            {
                textField.setPasswordEnabled((value == "True") ? true : false);
            }
            else if (name == "PasswordStyleText")
            {
                textField.setPasswordStyleText(value.c_str());
            }
            else if (name == "IsCustomSize")
            {
                isCustomSize = ((value == "True") ? true : false);
//                if (value == "Custom")
//                {
//                    var areaWidth = 0.0f;
//                    objectData.QueryFloatAttribute("Width", &areaWidth);
//                    
//                    var areaHeight = 0.0f;
//                    objectData.QueryFloatAttribute("Height", &areaHeight);
//                    
//                    textField.setTextAreaSize(Size(areaWidth, areaHeight));
//                }
            }
            else if (name == "Alpha")
            {
                opacity = atoi(value);
            }

            attribute = attribute.Next();
        }

        // child elements
        var child = objectData.FirstChildElement();
        while (child)
        {
            var name = child.Name();

            if (name == "Size")
            {
                var attribute = child.FirstAttribute();

                while (attribute)
                {
                    var name = attribute.Name();
                    var value = attribute.Value();

                    if (name == "X")
                    {
                        width = atof(value.c_str());
                    }
                    else if (name == "Y")
                    {
                        height = atof(value.c_str());
                    }

                    attribute = attribute.Next();
                }
            }
            else if (name == "FontResource")
            {
                var attribute = child.FirstAttribute();
                var resourceType = 0;
                var path = "", plistFile = "";

                while (attribute)
                {
                    var name = attribute.Name();
                    var value = attribute.Value();

                    if (name == "Path")
                    {
                        path = value;
                    }
                    else if (name == "Type")
                    {
                        resourceType = (value == "Normal" || value == "Default" || value == "MarkedSubImage") ? 0 : 1;
                    }
                    else if (name == "Plist")
                    {
                        plistFile = value;
                    }

                    attribute = attribute.Next();
                }

                switch (resourceType)
                {
                    case 0:
                    {
                        textField.setFontName(xmlPath + path);
                        break;
                    }

                    default:
                        break;
                }
            }

            child = child.NextSiblingElement();
        }

        if (isCustomSize)
        {
            textField.ignoreContentAdaptWithSize(!isCustomSize);
            textField.setContentSize(Size(width, height));
        }

        textField.setOpacity(opacity);
    }
};
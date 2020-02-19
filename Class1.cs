using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using Newtonsoft.Json;

public class Class1
{
    class Program
    {
        static string host = "https://api.cognitive.microsoft.com";
        static string path = "/bing/v7.0/spellcheck?";
        static string key = "25f61c4e-3330-408f-955a-d1f04c9d7f7c";
        //text to be spell-checked
        static string text = "Hollo, wrld!";
    }
}
